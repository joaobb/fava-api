import { Router } from "express";
import { ensuredAuthenticated } from "../middleware/ensuredAuthenticated";
import { paginate } from "../middleware/paginate";
import { is } from "../middleware/permissions";

import { Roles } from "../enums/Roles";
import { CreateClassroomController } from "../controllers/CreateClassroomController";
import { GetClassroomsController } from "../controllers/GetClassroomsController";
import { JoinClassroomController } from "../controllers/JoinClassroomController";

const classroomsRouter = Router();

classroomsRouter.post(
  "/",
  ensuredAuthenticated(),
  is([Roles.teacher, Roles.admin]),
  new CreateClassroomController().handle
);

classroomsRouter.post(
  "/join",
  ensuredAuthenticated(),
  new JoinClassroomController().handle
);

classroomsRouter.get(
  "/",
  ensuredAuthenticated(),
  paginate(),
  new GetClassroomsController().handle
);

export { classroomsRouter };
