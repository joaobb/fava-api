import { userRepository } from "../repositories/userRepository";
import { testSubmissionRepository } from "../repositories/testSubmissionRepository";
import { TestSubmission } from "../entities/TestSubmission";
import { testRepository } from "../repositories/testRepository";
import { GradeTestService } from "./GradeAutomatasService";

interface TestRequest {
  testId: number;
  userId: number;
  answer: {
    [automataId: number]: Automata.Automata;
  };
}

class SubmitTestAnswerService {
  async execute({
    testId,
    userId,
    answer,
  }: TestRequest): Promise<TestSubmission> {
    const taker = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!taker) throw new Error("Test taker not found");

    const test = await testRepository.findOne({
      where: {
        id: testId,
      },
      relations: ["automatas"],
    });

    if (!test) throw new Error("Test not found");

    const gradeTestService = new GradeTestService();
    const { gradedAnswers, grade } = await gradeTestService.execute({
      test,
      answers: answer,
    });

    const newTestSubmission = await testSubmissionRepository.create({
      test,
      taker,
      grade,
      authorReviewed: false,
      answers: gradedAnswers,
    });

    return await testSubmissionRepository.save(newTestSubmission);
  }
}

export { SubmitTestAnswerService };
