import { Request, Response } from "express";

import { DeleteExerciseService } from "../services/DeleteExerciseService";

class DeleteExerciseController {
  async handle(request: Request, response: Response) {
    const { exerciseId } = request.params;

    if (!exerciseId) throw new Error("Exercise not found");

    try {
      const deleteExerciseService = new DeleteExerciseService();
      const result = await deleteExerciseService.execute({
        exerciseId: Number(exerciseId),
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { DeleteExerciseController };
