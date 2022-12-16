import { automataRepository } from "../repositories/automataRepository";
import { Exercise } from "../entities/Exercise";
import { userRepository } from "../repositories/userRepository";
import { Privacy } from "../enums/Privacy";
import { In } from "typeorm";
import { exerciseRepository } from "../repositories/exerciseRepository";

interface ExerciseRequest {
  name: string;
  description: string;
  automatas: number[];
  authorId: number;
  privacy: string;
}

class CreateExerciseService {
  async execute({
    name,
    description,
    automatas,
    authorId,
    privacy,
  }: ExerciseRequest): Promise<Exercise> {
    if (!Object.values(Privacy).includes(privacy))
      throw new Error("Selected privacy is invalid");
    if (!automatas?.length) throw new Error("Invalid automatas selection");

    const author = await userRepository.findOne({
      where: {
        id: authorId,
      },
    });

    if (!author) throw new Error("Author not found");

    const selectedAutomatas = await automataRepository.find({
      where: [
        {
          id: In(automatas),
          privacy: Privacy.public,
        },
        {
          id: In(automatas),
          privacy: Privacy.private,
          author: { id: authorId },
        },
      ],
    });

    const newExercise = await exerciseRepository.create({
      name,
      description,
      automatas: selectedAutomatas,
      author,
      privacy,
    });

    return await exerciseRepository.save(newExercise);
  }
}

export { CreateExerciseService };
