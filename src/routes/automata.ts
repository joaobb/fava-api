import { Router } from "express";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { CreateAutomataController } from "../controllers/CreateAutomataController";
import { GetAutomataByIdController } from "../controllers/GetAutomataByIdController";
import { GetAutomatasController } from "../controllers/GetAutomatasController";
import { paginate } from "../middleware/paginate";

const automatasRouter = Router();

automatasRouter.post("/", new CreateAutomataController().handle);

automatasRouter.get("/", paginate(), new GetAutomatasController().handle);
automatasRouter.get("/:automataId", new GetAutomataByIdController().handle);
automatasRouter.put("/:automataId");
automatasRouter.delete("/:automataId");

export { automatasRouter };
