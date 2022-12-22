import { automataRepository } from "../repositories/automataRepository";
import { BadRequestError } from "../helpers/http-errors";

interface AutomataRequest {
  automataId: number;
}

class DeleteAutomataService {
  async execute({ automataId }: AutomataRequest): Promise<boolean> {
    const automata = await automataRepository.findOne({
      where: { id: automataId },
      relations: ["author"],
    });

    if (!automata) throw new BadRequestError("Automata does not exist");

    const result = await automataRepository.softDelete({
      id: automataId,
    });

    return Number(result?.affected) >= 1;
  }
}

export { DeleteAutomataService };
