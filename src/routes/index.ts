import { Router } from "express";
import { rolesRouter } from "./roles";
import { authRouter } from "./auth";
import { automatasRouter } from "./automata";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/roles", rolesRouter);
routes.use("/automatas", automatasRouter);

export { routes };
