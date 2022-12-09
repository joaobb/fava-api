import { automataRepository } from "../repositories/automataRepository";
import { Automata } from "../entities/Automata";
import { userRepository } from "../repositories/userRepository";

interface AutomataRequest {
  name: string;
  description: string;
  automata: Object;
  authorId: number;
}

class CreateAutomataService {
  async execute({
    name,
    description,
    automata,
    authorId,
  }: AutomataRequest): Promise<Automata> {
    const author = await userRepository.findOne({
      where: {
        id: authorId,
      },
    });

    if (!author) throw new Error("Author not found");

    // TODO: Upload automata to storage
    const source = "https://api.npoint.io/86994ad0b1e6757e0e90";

    const newAutomata = await automataRepository.create({
      name,
      description,
      source,
      author,
    });

    return await automataRepository.save(newAutomata);
  }
}

export { CreateAutomataService };
