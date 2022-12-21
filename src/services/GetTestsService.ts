import { testRepository } from "../repositories/testRepository";
import { Test } from "../entities/Test";
import { Privacy } from "../enums/Privacy";

interface TestRequest {
  isAdmin: boolean;
  userId: number;
  pageSize?: number;
  offset?: number;
}

interface TestResponse {
  tests: Test[];
  count: number;
}

class GetTestsService {
  async execute({
    isAdmin,
    userId,
    pageSize,
    offset,
  }: TestRequest): Promise<TestResponse> {
    const whereClause = !isAdmin
      ? [{ privacy: Privacy.public }, { author: { id: userId } }]
      : undefined;

    const [tests, count] = await testRepository.findAndCount({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        description: true,
        privacy: true,
      },
      where: whereClause,
      take: pageSize,
      skip: offset,
    });

    return { tests, count };
  }
}

export { GetTestsService };
