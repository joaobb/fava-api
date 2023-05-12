import { Request, Response } from "express";
import { GetTestsService } from "../services/GetTestsService";

class GetTestsController {
  async handle(request: Request, response: Response) {
    const { isAdmin, userId, pageSize, offset, query } = request;
    const solvedFilter = query.solved ? query.solved === "true" : undefined;

    const getTestsService = new GetTestsService();
    const result = await getTestsService.execute({
      isAdmin,
      userId,
      filter: {
        solved: solvedFilter,
      },
      pageSize,
      offset,
    });

    return response.status(200).json(result);
  }
}

export { GetTestsController };
