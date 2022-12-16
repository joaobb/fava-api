import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { GetUserIsAdminService } from "../services/GetUserIsAdminService";

export const identifyUser = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders || !process.env.JWT_SECRET) return next();

    const [, token] = authHeaders.split(" ");

    try {
      verify(token, process.env.JWT_SECRET);
      const userId = await decode(token)?.sub;

      const getUserIsAdminService = new GetUserIsAdminService();
      const isAdmin = await getUserIsAdminService.execute({
        userId: Number(userId),
      });

      request.userId = Number(userId);
      request.isAdmin = isAdmin;
    } catch (error) {
      console.error(error);
    }
    return next();
  };
};
