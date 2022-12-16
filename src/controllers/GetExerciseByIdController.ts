import { Request, Response } from "express";
import { GetExerciseByIdService } from "../services/GetExerciseByIdService";

class GetExerciseByIdController {
  async handle(request: Request, response: Response) {
    const { exerciseId } = request.params;
    const { userId, isAdmin } = request;

    try {
      const getExerciseByIdService = new GetExerciseByIdService();
      const result = await getExerciseByIdService.execute({
        isAdmin,
        userId,
        exerciseId: Number(exerciseId),
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { GetExerciseByIdController };
