import { Request, Response } from "express";

import { CreateAutomataService } from "../services/CreateAutomataService";

class CreateAutomataController {
  async handle(request: Request, response: Response) {
    const { name, description, automata, privacy } = request.body;
    const authorId = request.userId;

    try {
      const createAutomataService = new CreateAutomataService();
      const result = await createAutomataService.execute({
        name,
        description,
        automata,
        authorId,
        privacy,
      });

      return response.status(201).json({ id: result.id });
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { CreateAutomataController };
