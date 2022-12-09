import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, role } = request.body;

    try {
      const createUserService = new CreateUserService();
      const result = await createUserService.execute({
        name,
        email,
        password,
        role,
      });

      console.log(result);

      return response.status(201).send();
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}
