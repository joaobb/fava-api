import { testRepository } from "../repositories/testRepository";
import { Test } from "../entities/Test";
import { Privacy } from "../enums/Privacy";
import { BadRequestError } from "../helpers/http-errors";
import { Automata } from "../entities/Automata";

interface TestRequest {
  isAdmin: boolean;
  userId: number;
  testId: number;
}

interface TestResponse extends Partial<Omit<Test, "automatas" | "author">> {
  authorName: string;
  automatas: Partial<Automata>[];
}

class GetTestByIdService {
  async execute({
    isAdmin,
    userId,
    testId,
  }: TestRequest): Promise<TestResponse> {
    const whereClause = isAdmin
      ? { id: testId }
      : [
          { id: testId, privacy: Privacy.public },
          {
            id: testId,
            privacy: Privacy.classroomPrivate,
            classroomPrivate: { enrollees: { id: userId } },
          },
          { id: testId, privacy: Privacy.private, author: { id: userId } },
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
      relations: {
        automatas: { author: true },
        classroomPrivate: { enrollees: true },
        author: true,
      },
    });

    if (!assigment) throw new BadRequestError("Test not found");

    return {
      ...assigment,
      classroomPrivate: undefined,
      authorName: assigment.author.name,
      automatas: assigment.automatas.map((automata) => ({
        ...automata,
        source: undefined,
        deletedAt: undefined,
        authorName: automata.author.name,
      })),
    };
  }
}

export { GetTestByIdService };
