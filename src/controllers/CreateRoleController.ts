import { Request, Response } from "express";

import { CreateRoleService } from "../services/CreateRoleService";

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      const createRoleService = new CreateRoleService();
      const result = await createRoleService.execute({
        name,
        description,
      });

      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
