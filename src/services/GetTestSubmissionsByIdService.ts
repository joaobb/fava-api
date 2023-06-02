import { testSubmissionRepository } from "../repositories/testSubmissionRepository";
import { TestSubmission } from "../entities/TestSubmission";
import { BadRequestError } from "../helpers/http-errors";

interface TestSubmissionsRequest {
  testId: number;
}

interface TestSubmissionsResponse {
  submissions: TestSubmission[];
}

class GetTestSubmissionsByIdService {
  async execute({
    testId,
  }: TestSubmissionsRequest): Promise<TestSubmissionsResponse> {
    const testSubmissions = await testSubmissionRepository.find({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        test: { name: true },
        grade: true,
        authorReviewed: true,
        taker: {
          name: true,
          email: true,
        },
      },
      relations: { taker: true },
      where: { test: { id: testId } },
      order: { id: "DESC" },
    });

    if (!testSubmissions) throw new BadRequestError("No submission found");

    return { submissions: testSubmissions };
  }
}

export { GetTestSubmissionsByIdService };
