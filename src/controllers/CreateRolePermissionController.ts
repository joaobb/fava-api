import { Request, Response } from "express";
import { CreateRolePermissionService } from "../services/CreateRolePermissionService";

export class CreateRolePermissionController {
  async handle(request: Request, response: Response) {
    const { roleId } = request.params;
    const { permissions = [] } = request.body;

    try {
      if (!roleId) throw new Error("Role not found");

      const createRolePermissionService = new CreateRolePermissionService();

      const result = await createRolePermissionService.execute({
        roleId: Number(roleId),
        permissions,
      });

      return response.status(201).json({ id: result.id });
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
