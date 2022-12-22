import { Request, Response } from "express";
import { GetUserAnswersService } from "../services/GetUserAnswersService";

class GetUserAnswersController {
  async handle(request: Request, response: Response) {
    const { userId, pageSize, offset } = request;
    const getUserAnswersService = new GetUserAnswersService();
    const result = await getUserAnswersService.execute({
      userId,
      pageSize,
      offset,
    });

    return response.status(200).json(result);
  }
}

export { GetUserAnswersController };
