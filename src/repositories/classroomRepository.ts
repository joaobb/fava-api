import { AppDataSource } from "../data-source";
import { Classroom } from "../entities/ClassRoom";

const classroomRepository = AppDataSource.getRepository(Classroom);

export { classroomRepository };
