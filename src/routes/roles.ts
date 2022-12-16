import { Router } from "express";
import { CreateRoleController } from "../controllers/CreateRoleController";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { CreateRolePermissionController } from "../controllers/CreateRolePermissionController";
import { is } from "../middleware/permissions";
import { Roles } from "../enums/Roles";

const rolesRouter = Router();

rolesRouter.post(
  "/",
  ensuredAuthenticated(),
  new CreateRoleController().handle
);

rolesRouter.post(
  "/:roleId/permissions",
  ensuredAuthenticated(),
  is([Roles.admin]),
  new CreateRolePermissionController().handle
);

export { rolesRouter };
