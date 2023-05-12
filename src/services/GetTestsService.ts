import { testRepository } from "../repositories/testRepository";
import { Privacy } from "../enums/Privacy";
import { TestSubmission } from "../entities/TestSubmission";

interface TestRequest {
  isAdmin: boolean;
  userId: number;
  filter: {
    solved?: boolean;
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

class GetTestsService {
  async execute({
    isAdmin,
    userId,
    filter,
    pageSize,
    offset,
  }: TestRequest): Promise<TestResponse> {
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
      .where(
        `(:isAdmin OR test.privacy = :privacy OR test.author_id = :userId) AND (:noFilter OR submission.id IS ${
          filter.solved ? "NOT" : ""
        } NULL)`,
        {
          isAdmin,
          privacy: Privacy.public,
          userId,
          noFilter: filter.solved === undefined,
        }
      )
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
