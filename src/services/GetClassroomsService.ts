import { classroomRepository } from "../repositories/classroomRepository";
import { ILike } from "typeorm";

interface ClassroomRequest {
  isAdmin: boolean;
  userId: number;
  filter: {
    name?: string;
    mentored?: boolean;
  };
  pageSize?: number;
  offset?: number;
}

interface ClassroomResponse {
  classrooms: any[];
  totalItems: number;
}

class GetClassroomsService {
  async execute({
    isAdmin,
    userId,
    filter,
    pageSize,
    offset,
  }: ClassroomRequest): Promise<ClassroomResponse> {
    const [classrooms, count] = await classroomRepository.findAndCount({
      where: {
        name: filter.name ? ILike(`%${filter.name}%`) : undefined,
        mentor: filter.mentored ? { id: userId } : undefined,
        enrollees: !filter.mentored ? { id: userId } : undefined,
      },
      relations: { mentor: true, enrollees: true },
      skip: offset,
      take: pageSize,
    });

    return { classrooms, totalItems: count };
  }
}

export { GetClassroomsService };
