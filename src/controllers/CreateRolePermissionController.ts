import { Request, Response } from "express";
import { CreateRolePermissionService } from "../services/CreateRolePermissionService";
import { BadRequestError } from "../helpers/http-errors";

export class CreateRolePermissionController {
  async handle(request: Request, response: Response) {
    const { roleId } = request.params;
    const { permissions = [] } = request.body;

    if (!roleId) throw new BadRequestError("Role not found");

    const createRolePermissionService = new CreateRolePermissionService();

    const result = await createRolePermissionService.execute({
      roleId: Number(roleId),
      permissions,
    });

    return response.status(201).json({ id: result.id });
  }
}
