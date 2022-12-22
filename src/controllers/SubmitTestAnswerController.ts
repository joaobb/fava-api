import { Request, Response } from "express";
import { SubmitTestAnswerService } from "../services/SubmitTestAnswerService";

class SubmitTestAnswerController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;
    const { answer } = request.body;
    const { userId } = request;

    const createTestService = new SubmitTestAnswerService();
    const result = await createTestService.execute({
      userId,
      testId: Number(testId),
      answer,
    });

    return response.status(201).json({ id: result.id });
  }
}

export { SubmitTestAnswerController };
