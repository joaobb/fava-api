import { automataRepository } from "../repositories/automataRepository";
import { Automata } from "../entities/Automata";
import { userRepository } from "../repositories/userRepository";

interface AutomataRequest {
  automataId: number;
}

class GetAutomataByIdService {
  async execute({ automataId }: AutomataRequest): Promise<Automata> {
    const automata = await automataRepository.findOne({
      where: {
        id: automataId,
      },
    });

    if (!automata) throw new Error("Automata not found");

    return automata;
  }
}

export { GetAutomataByIdService };
