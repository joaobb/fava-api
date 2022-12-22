import { Request, Response } from "express";

import { DeleteTestService } from "../services/DeleteTestService";
import { BadRequestError } from "../helpers/http-errors";

class DeleteTestController {
  async handle(request: Request, response: Response) {
    const { testId } = request.params;

    if (!testId) throw new BadRequestError("Test not found");

    const deleteTestService = new DeleteTestService();
    const result = await deleteTestService.execute({
      testId: Number(testId),
    });

    return response.status(200).json(result);
  }
}

export { DeleteTestController };
