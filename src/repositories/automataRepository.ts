import { AppDataSource } from "../data-source";
import { Automata } from "../entities/Automata";

const automataRepository = AppDataSource.getRepository(Automata);

export { automataRepository };
