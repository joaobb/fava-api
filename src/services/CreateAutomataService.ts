import { automataRepository } from "../repositories/automataRepository";
import { Automata } from "../entities/Automata";
import { userRepository } from "../repositories/userRepository";
import { UploadJsonService } from "./UploadJsonService";

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
    const uploadJsonService = new UploadJsonService();
    const automataSource = await uploadJsonService.execute({
      payload: automata,
    });

    const newAutomata = await automataRepository.create({
      name,
      description,
      source: automataSource,
      author,
    });

    return await automataRepository.save(newAutomata);
  }
}

export { CreateAutomataService };
