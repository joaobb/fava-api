import { testRepository } from "../repositories/testRepository";
import { Privacy } from "../enums/Privacy";
import { TestSubmission } from "../entities/TestSubmission";

interface TestRequest {
  isAdmin: boolean;
  userId: number;
  pageSize?: number;
  offset?: number;
}

interface MaybeGradedTest {
  id: number;
  name: string;
  createdAt: Date;
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
      .select("test.id id, test.name name, test.createdAt createdAt")
      .addSelect("MAX(submission.grade)::int", "grade")
      .where(`test.privacy = :privacy OR test.author_id = :userId`, {
        privacy: Privacy.public,
        userId,
      })
      .groupBy("test.id")
      .limit(pageSize)
      .offset(offset)
      .execute();

    const parsedTests = tests.reduce(
      (parsedTests: MaybeGradedTest[], test: any) => {
        parsedTests.push({
          id: test.id,
          name: test.name,
          createdAt: test.createdat,
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
