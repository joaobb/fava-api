import { exerciseRepository } from "../repositories/exerciseRepository";
import { Exercise } from "../entities/Exercise";
import { Privacy } from "../enums/Privacy";

interface ExerciseRequest {
  isAdmin: boolean;
  userId: number;
  exerciseId: number;
}

class GetExerciseByIdService {
  async execute({
    isAdmin,
    userId,
    exerciseId,
  }: ExerciseRequest): Promise<Exercise> {
    const whereClause = isAdmin
      ? { id: exerciseId }
      : [
          { id: exerciseId, privacy: Privacy.public },
          { id: exerciseId, author: { id: userId } },
        ];

    const assigment = await exerciseRepository.findOne({
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

    if (!assigment) throw new Error("Exercise not found");

    return assigment;
  }
}

export { GetExerciseByIdService };
