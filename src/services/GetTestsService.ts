import { testRepository } from "../repositories/testRepository";
import { Privacy } from "../enums/Privacy";
import { TestSubmission } from "../entities/TestSubmission";

interface TestRequest {
  isAdmin: boolean;
  userId: number;
  filter: {
    name?: string;
    solved?: boolean;
    authored?: boolean;
    classroom?: number;
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

class GetTestsService {
  async execute({
    isAdmin,
    userId,
    filter,
    pageSize,
    offset,
  }: TestRequest): Promise<TestResponse> {
    // TODO: Improve query by using leftJoinAndMap
    const query = testRepository
      .createQueryBuilder("test")
      .leftJoin(
        TestSubmission,
        "submission",
        "test.id = submission.test AND submission.taker_id = :userId",
        { userId }
      )
      .select(
        "test.id id, test.name name, test.createdAt created_at,test.privacy" +
          " privacy,test.classroom_id classroom_id"
      )
      .addSelect("MAX(submission.grade)::int", "grade")
      .where(
        "(:isAdmin OR test.privacy = :privacy OR test.author_id = :userId OR" +
          " test.privacy = :classroomPrivate)",
        {
          isAdmin,
          privacy: Privacy.public,
          classroomPrivate: Privacy.classroomPrivate,
          userId,
        }
      )
      .groupBy("test.id");

    if (filter.name)
      query.andWhere("LOWER(test.name) LIKE LOWER(:nameFilter)", {
        nameFilter: `%${filter.name}%`,
      });

    if (filter.authored) query.andWhere("test.author_id = :userId", { userId });
    if (filter.classroom) {
      // TODO: Prevent non enrolled users to have access to classroom
      //  private exercises
      query.andWhere("test.classroom_id = :classroomId", {
        classroomId: filter.classroom,
      });
    }

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
