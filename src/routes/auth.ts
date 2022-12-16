import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { SessionController } from "../controllers/SessionController";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { CreateUserAccessControlListController } from "../controllers/CreateUserAccessControlListController";
import { is } from "../middleware/permissions";
import { Roles } from "../enums/Roles";

const authRouter = Router();

authRouter.post("/login", new SessionController().handle);
authRouter.post("/users", new CreateUserController().handle);

authRouter.post(
  "/users/acl",
  ensuredAuthenticated(),
  is([Roles.admin]),
  new CreateUserAccessControlListController().handle
);

export { authRouter };
