import { testRepository } from "../repositories/testRepository";
import { Privacy } from "../enums/Privacy";
import { TestSubmission } from "../entities/TestSubmission";
import { ObjectLiteral } from "typeorm/common/ObjectLiteral";

interface TestRequest {
  isAdmin: boolean;
  userId: number;
  filter: {
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
  count: number;
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
    const whereClauses: {
      [filter: string]: WhereClause;
    } = {
      authored: { where: "test.author_id = :userId", parameters: { userId } },
      solved: { where: "submission.id IS NOT NULL" },
      unsolved: { where: "submission.id IS NULL" },
      all: {
        where:
          ":isAdmin OR test.privacy = :privacy OR test.author_id = :userId",
        parameters: { isAdmin, privacy: Privacy.public, userId },
      },
    };

    let whereClause: WhereClause;

    if (filter.authored) whereClause = whereClauses.authored;
    else if (filter.solved) whereClause = whereClauses.solved;
    else if (filter.solved === false) whereClause = whereClauses.unsolved;
    else whereClause = whereClauses.all;

    const tests = await testRepository
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
      .where(whereClause.where, whereClause.parameters)
      .groupBy("test.id")
      .limit(pageSize)
      .offset(offset)
      .execute();

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

    return { tests: parsedTests, count: tests.length };
  }
}

export { GetTestsService };
