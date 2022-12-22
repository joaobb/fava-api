import { automataRepository } from "../repositories/automataRepository";
import { Automata } from "../entities/Automata";
import { Privacy } from "../enums/Privacy";
import { BadRequestError } from "../helpers/http-errors";

interface AutomataRequest {
  isAdmin: boolean;
  userId: number;
  automataId: number;
}

class GetAutomataByIdService {
  async execute({
    isAdmin,
    userId,
    automataId,
  }: AutomataRequest): Promise<Automata> {
    const whereClause = isAdmin
      ? { id: automataId }
      : [
          { id: automataId, privacy: Privacy.public },
          { id: automataId, author: { id: userId } },
        ];

    const automata = await automataRepository.findOne({
      where: whereClause,
    });

    if (!automata) throw new BadRequestError("Automata not found");

    return automata;
  }
}

export { GetAutomataByIdService };
