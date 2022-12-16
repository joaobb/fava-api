import { Request, Response } from "express";
import { CreateUserAccessControlListService } from "../services/CreateUserAccessControlListService";

export class CreateUserAccessControlListController {
  async handle(request: Request, response: Response) {
    const { targetEmail, permissions = [], roles = [] } = request.body;
    const { userId } = request;

    try {
      const createUserAccessControlListService =
        new CreateUserAccessControlListService();

      const result = await createUserAccessControlListService.execute({
        targetEmail,
        userId,
        permissions,
        roles,
      });

      return response.status(201).json({ id: result.id });
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
