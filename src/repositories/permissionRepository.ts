import { AppDataSource } from "../data-source";
import { Permission } from "../entities/Permission";

const permissionRepository = AppDataSource.getRepository(Permission);

export { permissionRepository };
