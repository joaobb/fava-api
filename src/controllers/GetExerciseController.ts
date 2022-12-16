import { Request, Response } from "express";
import { GetExercisesService } from "../services/GetExercisesService";

class GetExercisesController {
  async handle(request: Request, response: Response) {
    const { isAdmin, userId, pageSize, offset } = request;
    try {
      const getExercisesService = new GetExercisesService();
      const result = await getExercisesService.execute({
        isAdmin,
        userId,
        pageSize,
        offset,
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { GetExercisesController };
