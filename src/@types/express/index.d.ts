declare namespace Express {
  export interface Request {
    userId: number;

    offset: number;
    pageSize: number;
  }
}
