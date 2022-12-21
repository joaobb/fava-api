import { AppDataSource } from "../data-source";
import { Test } from "../entities/Test";

const testRepository = AppDataSource.getRepository(Test);

export { testRepository };
