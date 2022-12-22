import { testRepository } from "../repositories/testRepository";
import { Test } from "../entities/Test";
import { Privacy } from "../enums/Privacy";
import { BadRequestError } from "../helpers/http-errors";

interface TestRequest {
  isAdmin: boolean;
  userId: number;
  testId: number;
}

class GetTestByIdService {
  async execute({
    isAdmin,
    userId,
    testId,
  }: TestRequest): Promise<Test> {
    const whereClause = isAdmin
      ? { id: testId }
      : [
          { id: testId, privacy: Privacy.public },
          { id: testId, author: { id: userId } },
        ];

    const assigment = await testRepository.findOne({
      select: {
        id: true,
        name: true,
        description: true,
        privacy: true,
        createdAt: true,
        updatedAt: true,
      },
      where: whereClause,
      relations: ["automatas"],
    });

    if (!assigment) throw new BadRequestError("Test not found");

    return assigment;
  }
}

export { GetTestByIdService };
