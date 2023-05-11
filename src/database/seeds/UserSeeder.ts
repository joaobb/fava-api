import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { User } from "../../entities/User";
import { hash } from "bcryptjs";
import { Role } from "../../entities/Role";
import { Roles, RolesId } from "../../enums/Roles";

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;

    const userRepository = dataSource.getRepository(User);
    const passwordHash = await hash(process.env.ADMIN_PASSWORD, 8);

    const rolesRepository = dataSource.getRepository(Role);
    const adminRole = (await rolesRepository.findOneBy({
      id: RolesId[Roles.admin],
    }))!;

    const userData = {
      name: "admin",
      email: process.env.ADMIN_EMAIL,
      password: passwordHash,
      roles: [adminRole],
    };

    const newUser = await userRepository.create(userData);
    await userRepository.save(newUser);
  }
}
