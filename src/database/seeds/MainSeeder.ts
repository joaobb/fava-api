import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";
import { RolesSeeder } from "./RolesSeeder";
import { UserSeeder } from "./UserSeeder";

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, RolesSeeder);
    await runSeeder(dataSource, UserSeeder);
  }
}
