import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, role, roles = [] } = request.body;

    const createUserService = new CreateUserService();

    await createUserService.execute({
      name,
      email,
      password,
      roles: [role, ...roles].filter(Boolean),
    });

    return response.status(201).send();
  }
}
