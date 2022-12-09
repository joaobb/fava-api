import { automataRepository } from "../repositories/automataRepository";

interface AutomataRequest {
  isAdmin: boolean;
  userId: number;
  automataId: number;
}

class DeleteAutomataService {
  async execute({
    isAdmin,
    userId,
    automataId,
  }: AutomataRequest): Promise<boolean> {
    const automata = await automataRepository.findOne({
      where: { id: automataId },
      relations: ["author"],
    });

    if (!automata) throw new Error("Automata does not exist");

    if (automata.author.id !== userId) {
      if (!isAdmin) throw new Error("Unauthorized action");
    }

    const result = await automataRepository.softDelete({
      id: automataId,
    });

    return Number(result?.affected) >= 1;
  }
}

export { DeleteAutomataService };
