import { testSubmissionRepository } from "../repositories/testSubmissionRepository";
import { TestSubmission } from "../entities/TestSubmission";

interface UserAnswersRequest {
  userId: number;
  pageSize?: number;
  offset?: number;
}

interface UserAnswersResponse {
  userAnswers: TestSubmission[];
  count: number;
}

class GetUserAnswersService {
  async execute({
    userId,
    pageSize,
    offset,
  }: UserAnswersRequest): Promise<UserAnswersResponse> {
    const [userAnswers, count] = await testSubmissionRepository.findAndCount({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        test: { name: true },
        grade: true,
        authorReviewed: true,
      },
      where: { taker: { id: userId } },
      take: pageSize,
      skip: offset,
    });

    return { userAnswers, count };
  }
}

export { GetUserAnswersService };
