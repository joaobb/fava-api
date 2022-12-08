import { Request, Response } from "express";

import { CreateAutomataService } from "../services/CreateAutomataService";
import { GetAutomataByIdService } from "../services/GetAutomataByIdService";

class GetAutomataByIdController {
  async handle(request: Request, response: Response) {
    const { automataId } = request.params;

    try {
      const getAutomataByIdService = new GetAutomataByIdService();
      const result = await getAutomataByIdService.execute({
        automataId: Number(automataId),
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { GetAutomataByIdController };
