import { Request, Response } from "express";
import { GetTestSubmissionByIdService } from "../services/GetTestSubmissionByIdService";

class GetTestAnswerByIdController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;
    const { userId } = request;

    const getTestAnswerByIdService = new GetTestSubmissionByIdService();
    const result = await getTestAnswerByIdService.execute({
      userId,
      testId: Number(testId),
    });

    return response.status(200).json(result);
  }
}

export { GetTestAnswerByIdController };
