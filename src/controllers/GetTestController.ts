import { Request, Response } from "express";
import { GetTestsService } from "../services/GetTestsService";

class GetTestsController {
  async handle(request: Request, response: Response) {
    const { isAdmin, userId, pageSize, offset, query } = request;
    const nameFilter = query.name ? String(query.name).trim() : undefined;
    const solvedFilter = query.solved ? query.solved === "true" : undefined;
    const authoredFilter = query.authored === "true";

    const getTestsService = new GetTestsService();
    const result = await getTestsService.execute({
      isAdmin,
      userId,
      filter: {
        name: nameFilter,
        solved: solvedFilter,
        authored: authoredFilter,
      },
      pageSize,
      offset,
    });

    return response.status(200).json(result);
  }
}

export { GetTestsController };
