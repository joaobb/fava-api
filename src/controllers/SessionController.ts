import { Request, Response } from "express";
import { SessionService } from "../services/SessionService";

export class SessionController {
  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const sessionService = new SessionService();
      const result = await sessionService.execute({ email, password });

      return response.json(result);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
}
