import { Request, Response } from "express";

import { DeleteTestService } from "../services/DeleteTestService";

class DeleteTestController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;

    if (!testId) throw new Error("Test not found");

    try {
      const deleteTestService = new DeleteTestService();
      const result = await deleteTestService.execute({
        testId: Number(testId),
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { DeleteTestController };
