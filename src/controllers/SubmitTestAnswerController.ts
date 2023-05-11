import { Request, Response } from "express";
import { SubmitTestAnswerService } from "../services/SubmitTestAnswerService";

interface TestFeedback {
  [questionId: number]: boolean;
}

class SubmitTestAnswerController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;
    const { answer } = request.body;
    const { userId } = request;

    const createTestAnswerService = new SubmitTestAnswerService();
    const result = await createTestAnswerService.execute({
      userId,
      testId: Number(testId),
      answer,
    });

    const answersFeedback = result.answers.reduce(
      (feedback: TestFeedback, answer) => {
        feedback[answer.questionAutomata.id] = answer.correct;

        return feedback;
      },
      {}
    );

    return response.status(201).json({
      id: result.id,
      grade: Math.ceil(result.grade * 100) / 100,
      feedback: answersFeedback,
    });
  }
}

export { SubmitTestAnswerController };
