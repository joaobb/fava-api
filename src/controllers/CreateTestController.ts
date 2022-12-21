import { Request, Response } from "express";
import { CreateTestService } from "../services/CreateTestService";

class CreateTestController {
  async handle(request: Request, response: Response) {
    const { name, description, automatas, privacy } = request.body;
    const { userId: authorId } = request;

    try {
      const createTestService = new CreateTestService();
      const result = await createTestService.execute({
        name,
        description,
        automatasIds: automatas,
        authorId,
        privacy,
      });

      return response.status(201).json({ id: result.id });
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { CreateTestController };
