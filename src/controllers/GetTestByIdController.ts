import { Request, Response } from "express";
import { GetTestByIdService } from "../services/GetTestByIdService";

class GetTestByIdController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;
    const { userId, isAdmin } = request;

    const getTestByIdService = new GetTestByIdService();
    const result = await getTestByIdService.execute({
      isAdmin,
      userId,
      testId: Number(testId),
    });

    return response.status(200).json(result);
  }
}

export { GetTestByIdController };
