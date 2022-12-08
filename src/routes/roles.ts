import { Router } from "express";
import { CreateRoleController } from "../controllers/CreateRoleController";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";

const rolesRouter = Router();

rolesRouter.post(
  "/",
  ensuredAuthenticated(),
  new CreateRoleController().handle
);

export { rolesRouter };
