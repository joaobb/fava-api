import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Role } from "../../entities/Role";
import { Roles, RolesId } from "../../enums/Roles";

export class RolesSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);

    for (const role of Object.values(Roles)) {
      const roleData = {
        id: RolesId[role],
        name: role,
      };

      const newRole = await roleRepository.create(roleData);
      const res = await roleRepository.save(newRole);
    }
  }
}
