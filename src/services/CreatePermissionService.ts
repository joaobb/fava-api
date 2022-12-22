import { permissionRepository } from "../repositories/permissionRepository";
import { Permission } from "../entities/Permission";
import { BadRequestError } from "../helpers/http-errors";

interface PermissionRequest {
  name: string;
  description: string;
}

export class CreatePermissionService {
  async execute({ name, description }: PermissionRequest): Promise<Permission> {
    const alreadyExists = await permissionRepository.findOne({
      where: {
        name,
      },
    });

    if (alreadyExists) throw new BadRequestError("Permission already exists");

    const permission = permissionRepository.create({ name, description });
    await permissionRepository.save(permission);

    return permission;
  }
}
