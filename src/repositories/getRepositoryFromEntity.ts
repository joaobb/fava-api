import { AppDataSource } from "../data-source";
import { EntityTarget, ObjectLiteral } from "typeorm";

function getRepositoryFromEntity(entity: EntityTarget<ObjectLiteral>) {
  return AppDataSource.getRepository(entity);
}

export { getRepositoryFromEntity };
