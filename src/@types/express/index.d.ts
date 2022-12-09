declare namespace Express {
  export interface Request {
    userId: number;
    isAdmin: boolean;

    offset: number;
    pageSize: number;
  }
}
