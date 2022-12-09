import { permissionRepository } from "../repositories/permissionRepository";
import { Permission } from "../entities/Permission";

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

    if (alreadyExists) throw new Error("Permission already exists");

    const permission = permissionRepository.create({ name, description });
    await permissionRepository.save(permission);

    return permission;
  }
}
