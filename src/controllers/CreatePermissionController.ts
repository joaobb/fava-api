import { Request, Response } from "express";

import { CreatePermissionService } from "../services/CreatePermissionService";

export class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      const createPermissionService = new CreatePermissionService();
      const result = await createPermissionService.execute({
        name,
        description,
      });

      return response.status(201).json({ id: result.id });
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
