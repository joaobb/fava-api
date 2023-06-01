import { Request, Response } from "express";

import { JoinClassroomService } from "../services/JoinClassroomService";

class JoinClassroomController {
  async handle(request: Request, response: Response) {
    const { invitationToken } = request.body;
    const userId = request.userId;

    const joinClassroomService = new JoinClassroomService();
    const classroom = await joinClassroomService.execute({
      invitationToken,
      userId,
    });

    return response.status(201).json({
      classroomId: classroom.id,
      classroomName: classroom.name,
    });
  }
}

export { JoinClassroomController };
