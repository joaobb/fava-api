import { automataRepository } from "../repositories/automataRepository";
import { Automata } from "../entities/Automata";
import { userRepository } from "../repositories/userRepository";
import { UploadJsonService } from "./UploadJsonService";
import { Privacy } from "../enums/Privacy";
import { BadRequestError } from "../helpers/http-errors";

interface AutomataRequest {
  name: string;
  description: string;
  automata: Object;
  authorId: number;
  privacy: string;
}

class CreateAutomataService {
  async execute({
    name,
    description,
    automata,
    authorId,
    privacy,
  }: AutomataRequest): Promise<Automata> {
    if (!Object.values(Privacy).includes(privacy))
      throw new BadRequestError("Selected privacy is invalid");
    const author = await userRepository.findOne({
      where: {
        id: authorId,
      },
    });

    if (!author) throw new BadRequestError("Author not found");

    const uploadJsonService = new UploadJsonService();
    const automataSource = await uploadJsonService.execute({
      payload: automata,
    });

    const newAutomata = await automataRepository.create({
      name,
      description,
      source: automataSource,
      author,
      privacy,
    });

    return await automataRepository.save(newAutomata);
  }
}

export { CreateAutomataService };
