import { testRepository } from "../repositories/testRepository";
import { Privacy } from "../enums/Privacy";
import { TestSubmission } from "../entities/TestSubmission";
import { User } from "../entities/User";
import { Brackets } from "typeorm";
import { Classroom } from "../entities/ClassRoom";
// import { classroomRepository } from "../repositories/classroomRepository";

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
  authorName: string;
  submissionsCount: number;
  systemGradeAverage: number;
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

    // isAdmin || public || (private && author) || (classroomPrivate && userId is enrolled in the class)
    const testQuery = await testRepository
      .createQueryBuilder("test")
      .andWhere(
        new Brackets((qb) =>
          qb
            .where(":isAdmin", { isAdmin })
            .orWhere("test.privacy = 'public'")
            .orWhere("test.privacy = 'private' AND test.author_id = :userId", {
              userId,
            })
            .orWhere(
              "test.privacy = 'classroomPrivate' AND test.classroom_id = :classroomId",
              {
                classroomId: filter.classroom,
              }
            )
        )
      )
      .leftJoinAndSelect(
        Classroom,
        "classroom",
        "(test.classroom_id IS NOT NULL) AND (test.classroom_id = classroom.id)"
      )
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select("submission.test_id t_id")
            .addSelect("MAX(submission.grade)::int user_grade")
            .from(TestSubmission, "submission")
            .where("submission.taker_id = :userId", { userId })
            .groupBy("submission.test_id"),
        "grade",
        "test.id = grade.t_id"
      )
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select("submission.test_id t_id")
            .addSelect("COUNT(submission.grade)::int submissions_count")
            .addSelect("AVG(submission.grade)::int submissions_avg")
            .from(TestSubmission, "submission")
            .groupBy("submission.test_id"),
        "submission",
        "test.id = submission.t_id"
      )
      .leftJoinAndSelect(User, "author", "test.author_id = author.id");

    if (filter.name)
      testQuery.andWhere("test.name ILIKE :nameFilter", {
        nameFilter: `%${filter.name}%`,
      });

    if (filter.authored)
      testQuery.andWhere("test.author_id = :userId", { userId });
    if (filter.classroom) {
      testQuery.andWhere("test.classroom_id = :classroomId", {
        classroomId: filter.classroom,
      });
      // Prevent non enrolled users to have access to classroom private tests
      // .andWhereExists(
      //   classroomRepository
      //     .createQueryBuilder("classroom")
      //     .where("classroom.id = test.classroom_id")
      //     .leftJoinAndMapMany(
      //       "classroom.enrollees",
      //       "classroom.enrollees",
      //       "enrollee"
      //     )
      //     .andWhere("enrollee.id = :userId", { userId })
      // );
    }

    if (filter.solved) testQuery.andWhere("grade.t_id IS NOT NULL");
    else if (filter.solved === false) testQuery.andWhere("grade.t_id IS NULL");

    const countTotal = await testQuery.getCount();
    const tests = await testQuery.limit(pageSize).offset(offset).execute();

    const parsedTests = tests.reduce(
      (parsedTests: MaybeGradedTest[], item: any) => {
        parsedTests.push({
          id: item.test_id,
          name: item.test_name,
          createdAt: item.test_created_at,
          privacy: item.test_privacy,
          grade: item.user_grade,
          authorName: item.author_name,
          submissionsCount: item.submissions_count,
          systemGradeAverage: item.submissions_avg,
        });

        return parsedTests;
      },
      []
    );

    return { tests: parsedTests, totalItems: countTotal };
  }
}

export { GetTestsService };
