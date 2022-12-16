import { exerciseRepository } from "../repositories/exerciseRepository";

interface ExerciseRequest {
  exerciseId: number;
}

class DeleteExerciseService {
  async execute({ exerciseId }: ExerciseRequest): Promise<boolean> {
    const automata = await exerciseRepository.findOne({
      where: { id: exerciseId },
      relations: ["author"],
    });

    if (!automata) throw new Error("Exercise does not exist");

    const result = await exerciseRepository.softDelete({
      id: exerciseId,
    });

    return Number(result?.affected) >= 1;
  }
}

export { DeleteExerciseService };
