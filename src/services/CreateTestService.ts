import { automataRepository } from "../repositories/automataRepository";
import { Test } from "../entities/Test";
import { userRepository } from "../repositories/userRepository";
import { Privacy } from "../enums/Privacy";
import { In } from "typeorm";
import { testRepository } from "../repositories/testRepository";
import { BadRequestError } from "../helpers/http-errors";

interface TestRequest {
  name: string;
  description: string;
  automatasIds: number[];
  authorId: number;
  privacy: string;
}

class CreateTestService {
  async execute({
    name,
    description,
    automatasIds,
    authorId,
    privacy,
  }: TestRequest): Promise<Test> {
    if (!Object.values(Privacy).includes(privacy))
      throw new BadRequestError("Selected privacy is invalid");
    if (!automatasIds?.length)
      throw new BadRequestError("Invalid automata selection");

    const author = await userRepository.findOne({
      where: {
        id: authorId,
      },
    });

    if (!author) throw new BadRequestError("Author not found");

    const automatas = await automataRepository.find({
      where: [
        {
          id: In(automatasIds),
          privacy: Privacy.public,
        },
        {
          id: In(automatasIds),
          privacy: Privacy.private,
          author: { id: authorId },
        },
      ],
    });

    const newTest = await testRepository.create({
      name,
      description,
      automatas: automatas,
      author,
      privacy,
    });

    return await testRepository.save(newTest);
  }
}

export { CreateTestService };
