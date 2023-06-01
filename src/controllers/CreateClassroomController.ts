import { Request, Response } from "express";

import { CreateClassroomService } from "../services/CreateClassroomService";

class CreateClassroomController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;
    const userId = request.userId;

    const createClassroomService = new CreateClassroomService();
    const result = await createClassroomService.execute({
      name,
      description,
      userId,
    });

    return response
      .status(201)
      .json({ id: result.id, invitationToken: result.invitationToken });
  }
}

export { CreateClassroomController };
