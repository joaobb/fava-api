import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";

export const ensuredAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    console.log(authHeaders);

    if (!authHeaders) {
      return response.status(401).json({ error: "Token is missing" });
    }

    const [, token] = authHeaders.split(" ");

    try {
      if (!process.env.SECRET_JWT) return response.status(500);
      verify(token, process.env.SECRET_JWT);

      const sub = decode(token)?.sub;
      // @ts-ignore
      request.userId = sub?.toString();

      return next;
    } catch (error) {
      return response.status(401);
    }
  };
};
