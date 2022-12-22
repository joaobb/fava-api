import { Request, Response } from "express";
import { CreateTestService } from "../services/CreateTestService";

class CreateTestController {
  async handle(request: Request, response: Response) {
    const { name, description, automatas, privacy } = request.body;
    const { userId: authorId } = request;

    const createTestService = new CreateTestService();
    const result = await createTestService.execute({
      name,
      description,
      automatasIds: automatas,
      authorId,
      privacy,
    });

    return response.status(201).json({ id: result.id });
  }
}

export { CreateTestController };
