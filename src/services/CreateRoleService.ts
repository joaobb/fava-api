// import { Role } from "../entities/Role";
// import { RoleRepository } from "../repositories";

interface RoleRequest {
  name: string;
  description: string;
}

export class CreateRoleService {
  async execute({ name, description }: RoleRequest): Promise<null> {
    return new Promise((res) => res(null));
    // const repository = RoleRepository();
    //
    // const alreadyExists = await repository.findOne({
    //   where: {
    //     name,
    //   },
    // });
    //
    // if (alreadyExists) throw new Error("Role already exists");
    //
    // const role = repository.create({ name, description });
    // await repository.save(role);
    //
    // return role;
  }
}
