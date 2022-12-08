import { NextFunction, Request, Response } from "express";

export interface PaginatedRequest extends Request {
  offset?: number;
  pageSize?: number;
}

function paginate() {
  return async (
    request: PaginatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    const { "content-range": contentRange } = request.headers;

    const match = contentRange?.match(/(\d+)-(\d+)/);

    if (match) {
      request.offset = Number(match[1] ?? -1);
      request.pageSize = Number(match[2] ?? -1);
    }

    next();
  };
}

export { paginate };
