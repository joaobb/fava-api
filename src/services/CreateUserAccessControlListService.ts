import { userRepository } from "../repositories/userRepository";
import { permissionRepository } from "../repositories/permissionRepository";
import { In } from "typeorm";
import { roleRepository } from "../repositories/roleRepository";

type UserACLRequest = {
  userId: number;
  roles: string[];
  permissions: string[];
};

export class CreateUserAccessControlListService {
  async execute({ userId, roles, permissions }: UserACLRequest) {
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) throw new Error("User does not exists!");

    const foundRoles = await roleRepository.findBy({
      id: In(roles),
    });
    const foundPermissions = await permissionRepository.findBy({
      id: In(permissions),
    });

    user.roles = foundRoles;
    user.permissions = foundPermissions;

    await userRepository.save(user);

    return user;
  }
}
