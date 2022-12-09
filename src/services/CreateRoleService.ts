import { roleRepository } from "../repositories/roleRepository";
import { Role } from "../entities/Role";

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

    if (alreadyExists) throw new Error("Role already exists");

    const role = roleRepository.create({ name });
    await roleRepository.save(role);

    return role;
  }
}
