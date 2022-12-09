import { permissionRepository } from "../repositories/permissionRepository";
import { In } from "typeorm";
import { roleRepository } from "../repositories/roleRepository";

type RolePermissionRequest = {
  roleId: number;
  permissions: number[];
};

export class CreateRolePermissionService {
  async execute({ roleId, permissions }: RolePermissionRequest) {
    const role = await roleRepository.findOneBy({ id: roleId });

    if (!role) throw new Error("Role does not exists!");

    role.permissions = await permissionRepository.findBy({
      id: In(permissions),
    });

    await roleRepository.save(role);

    return role;
  }
}
