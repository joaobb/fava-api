import { AppDataSource } from "../data-source";
import { Role } from "../entities/Role";

const roleRepository = AppDataSource.getRepository(Role);

export { roleRepository };
