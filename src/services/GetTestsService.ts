import { testRepository } from "../repositories/testRepository";
import { Privacy } from "../enums/Privacy";
import { TestSubmission } from "../entities/TestSubmission";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";

interface TestRequest {
  isAdmin: boolean;
  userId: number;
  filter: {
    name?: string;
    solved?: boolean;
    authored?: boolean;
  };
  pageSize?: number;
  offset?: number;
}

interface MaybeGradedTest {
  id: number;
  name: string;
  createdAt: Date;
  privacy: keyof typeof Privacy;
  grade: number;
}

interface TestResponse {
  tests: MaybeGradedTest[];
  totalItems: number;
}

interface WhereClause {
  where: string;
  parameters?: ObjectLiteral;
}

class GetTestsService {
  async execute({
    isAdmin,
    userId,
    filter,
    pageSize,
    offset,
  }: TestRequest): Promise<TestResponse> {
    const query = testRepository
      .createQueryBuilder("test")
      .leftJoin(
        TestSubmission,
        "submission",
        "test.id = submission.test AND submission.taker_id = :userId",
        { userId }
      )
      .select(
        "test.id id, test.name name, test.createdAt created_at,test.privacy privacy"
      )
      .addSelect("MAX(submission.grade)::int", "grade")
      .where(
        "(:isAdmin OR test.privacy = :privacy OR test.author_id = :userId)",
        {
          isAdmin,
          privacy: Privacy.public,
          userId,
        }
      )
      .groupBy("test.id");

    if (filter.name)
      query.andWhere("LOWER(test.name) LIKE LOWER(:nameFilter)", {
        nameFilter: `%${filter.name}%`,
      });

    if (filter.authored) query.andWhere("test.author_id = :userId", { userId });

    if (filter.solved) query.andWhere("submission.id IS NOT NULL");
    else if (filter.solved === false) query.andWhere("submission.id IS NULL");

    const countTotal = await query.getCount();
    const tests = await query.limit(pageSize).offset(offset).execute();

    const parsedTests = tests.reduce(
      (parsedTests: MaybeGradedTest[], test: any) => {
        parsedTests.push({
          id: test.id,
          name: test.name,
          createdAt: test.created_at,
          privacy: test.privacy,
          grade: test.grade,
        });

        return parsedTests;
      },
      []
    );

    return { tests: parsedTests, totalItems: countTotal };
  }
}

export { GetTestsService };
