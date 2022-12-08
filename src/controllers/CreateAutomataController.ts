import { Request, Response } from "express";

import { CreateAutomataService } from "../services/CreateAutomataService";

class CreateAutomataController {
  async handle(request: Request, response: Response) {
    const { name, description, automata } = request.body;

    console.log({name, description});

    try {
      const createAutomataService = new CreateAutomataService();
      const result = await createAutomataService.execute({
          name,
        description,
        automata
      });

      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { CreateAutomataController };
