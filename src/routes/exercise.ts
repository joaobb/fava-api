import { Router } from "express";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { paginate } from "../middleware/paginate";
import { authorOrAdminOnly, is } from "../middleware/permissions";
import { Roles } from "../enums/Roles";
import { CreateExerciseController } from "../controllers/CreateExerciseController";
import { DeleteExerciseController } from "../controllers/DeleteExerciseController";
import { Exercise } from "../entities/Exercise";
import { GetExerciseByIdController } from "../controllers/GetExerciseByIdController";
import { GetExercisesController } from "../controllers/GetExerciseController";

const exercisesRouter = Router();

exercisesRouter.post(
  "/",
  ensuredAuthenticated(),
  is([Roles.teacher]),
  new CreateExerciseController().handle
);

exercisesRouter.get("/", paginate(), new GetExercisesController().handle);

exercisesRouter.get(
  "/:exerciseId",
  new GetExerciseByIdController().handle
);

exercisesRouter.put(
  "/:exerciseId",
  ensuredAuthenticated(),
  is([Roles.admin, Roles.teacher]),
  authorOrAdminOnly("exerciseId", Exercise)
);

exercisesRouter.delete(
  "/:exerciseId",
  ensuredAuthenticated(),
  is([Roles.admin, Roles.teacher]),
  authorOrAdminOnly("exerciseId", Exercise),
  new DeleteExerciseController().handle
);

export { exercisesRouter };
