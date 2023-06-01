import { Router } from "express";
import { rolesRouter } from "./roles";
import { authRouter } from "./auth";
import { automatasRouter } from "./automata";
import { identifyUser } from "../middleware/identifyUser";
import { testsRouter } from "./test";
import { classroomsRouter } from "./classroom";

const routes = Router();

routes.use(identifyUser());

routes.use("/", authRouter);
// routes.use("/roles", rolesRouter);
routes.use("/automatas", automatasRouter);
routes.use("/tests", testsRouter);
routes.use("/classrooms", classroomsRouter);

export { routes };
