import { userRepository } from "../repositories/userRepository";
import { permissionRepository } from "../repositories/permissionRepository";
import { In } from "typeorm";
import { roleRepository } from "../repositories/roleRepository";

type UserACLRequest = {
  targetEmail: string;
  userId: number;
  roles: string[];
  permissions: string[];
};

export class CreateUserAccessControlListService {
  async execute({ targetEmail, roles, permissions }: UserACLRequest) {
    if (!targetEmail) throw new Error("Target email is needed!");

    const user = await userRepository.findOneBy({ email: targetEmail });

    if (!user) throw new Error("User does not exists!");

    const foundRoles = await roleRepository.findBy({
      name: In(roles),
    });
    const foundPermissions = await permissionRepository.findBy({
      name: In(permissions),
    });

    user.roles = foundRoles;
    user.permissions = foundPermissions;

    await userRepository.save(user);

    return user;
  }
}
