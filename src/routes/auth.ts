import { Router } from "express";
import { SessionController } from "../controllers/SessionController";

const authRouter = Router();

authRouter.post("/login", new SessionController().handle);

export { authRouter };
