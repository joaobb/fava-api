import { Router } from "express";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { paginate } from "../middleware/paginate";
import { authorOrAdminOnly, is } from "../middleware/permissions";

import { Roles } from "../enums/Roles";

import { CreateTestController } from "../controllers/CreateTestController";
import { DeleteTestController } from "../controllers/DeleteTestController";
import { Test } from "../entities/Test";
import { GetTestByIdController } from "../controllers/GetTestByIdController";
import { GetTestsController } from "../controllers/GetTestController";
import { SubmitTestAnswerController } from "../controllers/SubmitTestAnswerController";
import { GetUserAnswersController } from "../controllers/GetUserAnswersController";
import { GetTestAnswerByIdController } from "../controllers/GetTestAnswerByIdController";

const testsRouter = Router();

testsRouter.post(
  "/",
  ensuredAuthenticated(),
  is([Roles.teacher]),
  new CreateTestController().handle
);

testsRouter.get("/", paginate(), new GetTestsController().handle);

testsRouter.get(
  "/answers",
  ensuredAuthenticated(),
  paginate(),
  new GetUserAnswersController().handle
);

testsRouter.get("/:testId", new GetTestByIdController().handle);

testsRouter.put(
  "/:testId",
  ensuredAuthenticated(),
  is([Roles.admin, Roles.teacher]),
  authorOrAdminOnly("testId", Test)
);

testsRouter.delete(
  "/:testId",
  ensuredAuthenticated(),
  is([Roles.admin, Roles.teacher]),
  authorOrAdminOnly("testId", Test),
  new DeleteTestController().handle
);

testsRouter.post(
  "/:testId/answer",
  ensuredAuthenticated(),
  new SubmitTestAnswerController().handle
);

testsRouter.get(
  "/:testId/answer",
  ensuredAuthenticated(),
  new GetTestAnswerByIdController().handle
);

export { testsRouter };
