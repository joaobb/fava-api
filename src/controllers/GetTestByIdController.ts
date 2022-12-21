import { Request, Response } from "express";
import { GetTestByIdService } from "../services/GetTestByIdService";

class GetTestByIdController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;
    const { userId, isAdmin } = request;

    try {
      const getTestByIdService = new GetTestByIdService();
      const result = await getTestByIdService.execute({
        isAdmin,
        userId,
        testId: Number(testId),
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { GetTestByIdController };
