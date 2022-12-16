import { Router } from "express";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { CreatePermissionController } from "../controllers/CreatePermissionController";
import { is } from "../middleware/permissions";
import { Roles } from "../enums/Roles";

const permissionRouter = Router();

permissionRouter.post(
  "/",
  ensuredAuthenticated(),
  is([Roles.admin]),
  new CreatePermissionController().handle
);

export { permissionRouter };
