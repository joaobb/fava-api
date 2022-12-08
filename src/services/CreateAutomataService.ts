import { automataRepository } from "../repositories/automataRepository";
import { Automata } from "../entities/Automata";
import { userRepository } from "../repositories/userRepository";

interface AutomataRequest {
  name: string;
  description: string;
  automata: Object;
}

class CreateAutomataService {
  async execute({
    name,
    description,
    automata,
  }: AutomataRequest): Promise<Automata> {
    const author = userRepository.findOne({
      where: {
        id: 1,
      },
    });
    
    console.log(author);
    
    const source = JSON.stringify(automata);
    const newAutomata = await automataRepository.create({
      name,
      description,
      source,
    });

    return await automataRepository.save(newAutomata);
  }
}

export { CreateAutomataService };
