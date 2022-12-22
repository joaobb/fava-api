import { roleRepository } from "../repositories/roleRepository";
import { Role } from "../entities/Role";
import { BadRequestError } from "../helpers/http-errors";

interface RoleRequest {
  name: string;
}

export class CreateRoleService {
  async execute({ name }: RoleRequest): Promise<Role> {
    const alreadyExists = await roleRepository.findOne({
      where: {
        name,
      },
    });

    if (alreadyExists) throw new BadRequestError("Role already exists");

    const role = roleRepository.create({ name });
    await roleRepository.save(role);

    return role;
  }
}
