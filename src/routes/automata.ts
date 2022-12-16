import { Router } from "express";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { CreateAutomataController } from "../controllers/CreateAutomataController";
import { GetAutomataByIdController } from "../controllers/GetAutomataByIdController";
import { GetAutomatasController } from "../controllers/GetAutomatasController";
import { paginate } from "../middleware/paginate";
import { authorOrAdminOnly, is } from "../middleware/permissions";
import { DeleteAutomataController } from "../controllers/DeleteAutomataController";
import { Automata } from "../entities/Automata";
import { Roles } from "../enums/Roles";
import { identifyUser } from "../middleware/identifyUser";

const automatasRouter = Router();

automatasRouter.post(
  "/",
  ensuredAuthenticated(),
  is([Roles.admin, Roles.teacher]),
  new CreateAutomataController().handle
);

automatasRouter.get(
  "/",
  identifyUser(),
  paginate(),
  new GetAutomatasController().handle
);

automatasRouter.get(
  "/:automataId",
  identifyUser(),
  new GetAutomataByIdController().handle
);

automatasRouter.put(
  "/:automataId",
  ensuredAuthenticated(),
  is([Roles.admin, Roles.teacher]),
  authorOrAdminOnly("automataId", Automata)
);

automatasRouter.delete(
  "/:automataId",
  ensuredAuthenticated(),
  is([Roles.admin, Roles.teacher]),
  authorOrAdminOnly("automataId", Automata),
  new DeleteAutomataController().handle
);

export { automatasRouter };
