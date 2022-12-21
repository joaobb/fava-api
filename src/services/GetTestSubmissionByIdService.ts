import { testSubmissionRepository } from "../repositories/testSubmissionRepository";
import { TestSubmission } from "../entities/TestSubmission";

interface TestAnswerRequest {
  userId: number;
  testId: number;
}

interface TestAnswerResponse {
  answer: TestSubmission;
}

class GetTestSubmissionByIdService {
  async execute({
    userId,
    testId,
  }: TestAnswerRequest): Promise<TestAnswerResponse> {
    const testAnswer = await testSubmissionRepository.findOne({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        test: { name: true },
        grade: true,
        authorReviewed: true,
      },
      where: { test: { id: testId }, taker: { id: userId } },
      order: { id: "DESC" },
    });

    if (!testAnswer) throw new Error("Answer not found");

    return { answer: testAnswer };
  }
}

export { GetTestSubmissionByIdService };
