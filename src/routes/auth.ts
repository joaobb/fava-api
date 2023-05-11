import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { SessionController } from "../controllers/SessionController";

const authRouter = Router();

authRouter.post("/login", new SessionController().handle);
authRouter.post("/users", new CreateUserController().handle);


export { authRouter };
