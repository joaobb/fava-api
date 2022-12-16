import { exerciseRepository } from "../repositories/exerciseRepository";
import { Exercise } from "../entities/Exercise";
import { Privacy } from "../enums/Privacy";

interface ExerciseRequest {
  isAdmin: boolean;
  userId: number;
  pageSize?: number;
  offset?: number;
}

interface ExerciseResponse {
  exercises: Exercise[];
  count: number;
}

class GetExercisesService {
  async execute({
    isAdmin,
    userId,
    pageSize,
    offset,
  }: ExerciseRequest): Promise<ExerciseResponse> {
    const whereClause = !isAdmin
      ? [{ privacy: Privacy.public }, { author: { id: userId } }]
      : undefined;

    const [exercises, count] = await exerciseRepository.findAndCount({
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

    return { exercises, count };
  }
}

export { GetExercisesService };
