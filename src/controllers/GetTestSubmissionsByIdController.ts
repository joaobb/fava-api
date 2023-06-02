import { Request, Response } from "express";
import { GetTestSubmissionsByIdService } from "../services/GetTestSubmissionsByIdService";

class GetTestSubmissionsByIdController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;

    const getTestSubmissionsByIdService = new GetTestSubmissionsByIdService();
    const result = await getTestSubmissionsByIdService.execute({
      testId: Number(testId),
    });

    return response.status(200).json(result);
  }
}

export { GetTestSubmissionsByIdController };
