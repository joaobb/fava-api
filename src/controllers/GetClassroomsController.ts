import { Request, Response } from "express";
import { GetClassroomsService } from "../services/GetClassroomsService";

class GetClassroomsController {
  async handle(request: Request, response: Response) {
    const { isAdmin, userId, pageSize, offset, query } = request;
    const nameFilter = query.name ? String(query.name).trim() : undefined;
    const mentoredFilter = query.mentored === "true";

    const getClassroomsService = new GetClassroomsService();
    const result = await getClassroomsService.execute({
      isAdmin,
      userId,
      filter: {
        name: nameFilter,
        mentored: mentoredFilter,
      },
      pageSize,
      offset,
    });

    return response.status(200).json(result);
  }
}

export { GetClassroomsController };
