import { Router } from "express";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { CreatePermissionController } from "../controllers/CreatePermissionController";

const permissionRouter = Router();

permissionRouter.post(
  "/",
  ensuredAuthenticated(),
  new CreatePermissionController().handle
);

export { permissionRouter };
