import { testRepository } from "../repositories/testRepository";
import { BadRequestError } from "../helpers/http-errors";

interface TestRequest {
  testId: number;
}

class DeleteTestService {
  async execute({ testId }: TestRequest): Promise<boolean> {
    const automata = await testRepository.findOne({
      where: { id: testId },
      relations: ["author"],
    });

    if (!automata) throw new BadRequestError("Test does not exist");

    const result = await testRepository.softDelete({
      id: testId,
    });

    return Number(result?.affected) >= 1;
  }
}

export { DeleteTestService };
