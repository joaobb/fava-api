import { Request, Response } from "express";
import { GetAutomataByIdService } from "../services/GetAutomataByIdService";

class GetAutomataByIdController {
  async handle(request: Request, response: Response) {
    const { automataId } = request.params;
    const { userId, isAdmin } = request;

    try {
      const getAutomataByIdService = new GetAutomataByIdService();
      const result = await getAutomataByIdService.execute({
        isAdmin,
        userId,
        automataId: Number(automataId),
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { GetAutomataByIdController };
