import { Request, Response } from "express";

import { DeleteAutomataService } from "../services/DeleteAutomataService";
import { BadRequestError } from "../helpers/http-errors";

class DeleteAutomataController {
  async handle(request: Request, response: Response) {
    const { automataId } = request.params;

    if (!automataId) throw new BadRequestError("Automata not found");

    const deleteAutomataService = new DeleteAutomataService();
    const result = await deleteAutomataService.execute({
      automataId: Number(automataId),
    });

    return response.status(200).json(result);
  }
}

export { DeleteAutomataController };
