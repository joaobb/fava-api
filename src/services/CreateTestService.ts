import { automataRepository } from "../repositories/automataRepository";
import { Test } from "../entities/Test";
import { userRepository } from "../repositories/userRepository";
import { Privacy } from "../enums/Privacy";
import { In } from "typeorm";
import { testRepository } from "../repositories/testRepository";
import { BadRequestError } from "../helpers/http-errors";
import { classroomRepository } from "../repositories/classroomRepository";
import { Classroom } from "../entities/ClassRoom";

interface TestRequest {
  name: string;
  description: string;
  automatasIds: number[];
  authorId: number;
  privacy: string;
  classroomPrivate?: number;
}

class CreateTestService {
  async execute({
    name,
    description,
    automatasIds,
    authorId,
    privacy,
    classroomPrivate,
  }: TestRequest): Promise<Test> {
    if (!Object.values(Privacy).includes(privacy))
      throw new BadRequestError("Selected privacy is invalid");
    if (!automatasIds?.length)
      throw new BadRequestError("Invalid automata selection");

    if (privacy === Privacy.classroomPrivate && !classroomPrivate)
      throw new BadRequestError("Invalid classroom selected");

    let classroom: Classroom | null = null;

    if (privacy === Privacy.classroomPrivate) {
      classroom = await classroomRepository.findOneBy({
        id: classroomPrivate,
      });

      if (!classroom === null) throw new BadRequestError("Classroom not found");
    }

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
      classroomPrivate: classroom || undefined,
    });

    return await testRepository.save(newTest);
  }
}

export { CreateTestService };
