import { Request, Response } from "express";
import { CreateExerciseService } from "../services/CreateExerciseService";

class CreateExerciseController {
  async handle(request: Request, response: Response) {
    const { name, description, automatas, privacy } = request.body;
    const { userId: authorId } = request;

    try {
      const createExerciseService = new CreateExerciseService();
      const result = await createExerciseService.execute({
        name,
        description,
        automatas,
        authorId,
        privacy,
      });

      return response.status(201).json({ id: result.id });
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { CreateExerciseController };
