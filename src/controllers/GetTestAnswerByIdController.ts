import { Request, Response } from "express";
import { GetTestSubmissionByIdService } from "../services/GetTestSubmissionByIdService";

class GetTestAnswerByIdController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;
    const { userId } = request;

    try {
      const getTestAnswerByIdService = new GetTestSubmissionByIdService();
      const result = await getTestAnswerByIdService.execute({
        userId,
        testId: Number(testId),
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { GetTestAnswerByIdController };
