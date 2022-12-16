import { NextFunction, Request, Response } from "express";

export const ensuredAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    const { userId } = request;

    if (!authHeaders)
      return response.status(401).json({ error: "Token is missing" });

    if (!userId) return response.status(401).json({ error: "Invalid user" });

    return next();
  };
};
