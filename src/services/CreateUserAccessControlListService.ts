import { userRepository } from "../repositories/userRepository";
import { permissionRepository } from "../repositories/permissionRepository";
import { In } from "typeorm";
import { roleRepository } from "../repositories/roleRepository";
import { BadRequestError } from "../helpers/http-errors";

type UserACLRequest = {
  targetEmail: string;
  userId: number;
  roles: string[];
  permissions: string[];
};

export class CreateUserAccessControlListService {
  async execute({ targetEmail, roles, permissions }: UserACLRequest) {
    if (!targetEmail) throw new BadRequestError("Target email is needed!");

    const user = await userRepository.findOneBy({ email: targetEmail });

    if (!user) throw new BadRequestError("User does not exists!");

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
