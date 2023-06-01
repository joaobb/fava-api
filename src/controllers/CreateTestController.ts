import { Request, Response } from "express";
import { CreateTestService } from "../services/CreateTestService";

class CreateTestController {
  async handle(request: Request, response: Response) {
    const { name, description, automatas, privacy, classroomPrivate } =
      request.body;
    const { userId: authorId } = request;

    const createTestService = new CreateTestService();
    const result = await createTestService.execute({
      name,
      description,
      automatasIds: automatas,
      authorId,
      privacy,
      classroomPrivate: classroomPrivate ? Number(classroomPrivate) : undefined,
    });

    return response.status(201).json({ id: result.id });
  }
}

export { CreateTestController };
