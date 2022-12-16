import { AppDataSource } from "../data-source";
import { Exercise } from "../entities/Exercise";

const exerciseRepository = AppDataSource.getRepository(Exercise);

export { exerciseRepository };
