import { Request, Response, NextFunction } from "express";

function auth(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization;
  const jwtToken = token?.replace("Bearer", "");
}
