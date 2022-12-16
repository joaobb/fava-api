import { Request, Response } from "express";

import { DeleteAutomataService } from "../services/DeleteAutomataService";

class DeleteAutomataController {
  async handle(request: Request, response: Response) {
    const { automataId } = request.params;

    if (!automataId) throw new Error("Automata not found");

    try {
      const deleteAutomataService = new DeleteAutomataService();
      const result = await deleteAutomataService.execute({
        automataId: Number(automataId),
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { DeleteAutomataController };
