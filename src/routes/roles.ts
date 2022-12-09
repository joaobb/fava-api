import { Router } from "express";
import { CreateRoleController } from "../controllers/CreateRoleController";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { CreateRolePermissionController } from "../controllers/CreateRolePermissionController";

const rolesRouter = Router();

rolesRouter.post(
  "/",
  ensuredAuthenticated(),
  new CreateRoleController().handle
);

rolesRouter.post(
  "/:roleId/permissions",
  ensuredAuthenticated(),
  new CreateRolePermissionController().handle
);

export { rolesRouter };
