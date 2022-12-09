import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";

export const ensuredAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      return response.status(401).json({ error: "Token is missing" });
    }

    const [, token] = authHeaders.split(" ");

    try {
      if (!process.env.JWT_SECRET) return response.status(500);
      verify(token, process.env.JWT_SECRET);

      const userId = await decode(token)?.sub;

      // @ts-ignore
      request.userId = Number(userId);

      return next();
    } catch (error) {
      return response.status(401);
    }
  };
};
