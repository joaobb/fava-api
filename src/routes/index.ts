import { Router } from "express";
import { rolesRouter } from "./roles";
import { permissionRouter } from "./permission";
import { authRouter } from "./auth";
import { automatasRouter } from "./automata";

const routes = Router();

routes.use("/", authRouter);
routes.use("/roles", rolesRouter);
routes.use("/permissions", permissionRouter);
routes.use("/automatas", automatasRouter);

export { routes };
