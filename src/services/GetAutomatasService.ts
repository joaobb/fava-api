import { automataRepository } from "../repositories/automataRepository";
import { Automata } from "../entities/Automata";
import { userRepository } from "../repositories/userRepository";

interface AutomataRequest {
  pageSize?: number;
  offset?: number;
}

interface AutomataResponse {
  automatas: Automata[];
  count: number;
}

class GetAutomatasService {
  async execute({
    pageSize,
    offset,
  }: AutomataRequest): Promise<AutomataResponse> {
    const [automatas, count] = await automataRepository.findAndCount({
      where: {},
      take: pageSize,
      skip: offset,
    });

    return { automatas, count };
  }
}

export { GetAutomatasService };
