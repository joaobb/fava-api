import { Request, Response } from "express";

import { CreateRoleService } from "../services/CreateRoleService";

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createRoleService = new CreateRoleService();
    const result = await createRoleService.execute({
      name,
    });

    return response.status(201).json({ id: result.id });
  }
}
