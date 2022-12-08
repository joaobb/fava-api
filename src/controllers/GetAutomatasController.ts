import { Request, Response } from "express";

import { CreateAutomataService } from "../services/CreateAutomataService";
import { GetAutomataByIdService } from "../services/GetAutomataByIdService";
import { GetAutomatasService } from "../services/GetAutomatasService";
import { PaginatedRequest } from "../middleware/paginate";

class GetAutomatasController {
  async handle(request: PaginatedRequest, response: Response) {
    const { pageSize, offset } = request;

    try {
      const getAutomatasService = new GetAutomatasService();
      const result = await getAutomatasService.execute({
        pageSize,
        offset,
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { GetAutomatasController };
