import { Router } from "express";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { CreateAutomataController } from "../controllers/CreateAutomataController";
import { GetAutomataByIdController } from "../controllers/GetAutomataByIdController";
import { GetAutomatasController } from "../controllers/GetAutomatasController";
import { paginate } from "../middleware/paginate";
import { can } from "../middleware/permissions";

const automatasRouter = Router();

automatasRouter.post(
  "/",
  ensuredAuthenticated(),
  can(["create_automata"]),
  new CreateAutomataController().handle
);

automatasRouter.get("/", paginate(), new GetAutomatasController().handle);
automatasRouter.get("/:automataId", new GetAutomataByIdController().handle);
automatasRouter.put("/:automataId");
automatasRouter.delete("/:automataId");

export { automatasRouter };
