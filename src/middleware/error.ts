import { Request, Response } from "express";
import { HttpError } from "../helpers/http-errors";

export const errorMiddleware = () => {
  return async (
    error: Error & HttpError,
    request: Request,
    response: Response
  ) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal Server Error";

    return response.status(statusCode).json({ message });
  };
};
