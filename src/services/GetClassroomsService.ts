import { classroomRepository } from "../repositories/classroomRepository";
import { ILike, ObjectLiteral } from "typeorm";

interface ClassroomRequest {
  isAdmin: boolean;
  userId: number;
  filter: {
    name?: string;
    mentoredOnly?: boolean;
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
    const nameFilterWhereClause = {
      name: filter.name ? ILike(`%${filter.name}%`) : undefined,
    };

    const whereClause: ObjectLiteral = [
      { ...nameFilterWhereClause, mentor: { id: userId } },
    ];

    // Will also return enrolled classrooms
    if (!filter.mentoredOnly) {
      whereClause.push({
        ...nameFilterWhereClause,
        enrollees: { id: userId },
      });
    }

    const [classrooms, count] = await classroomRepository.findAndCount({
      select: {
        mentor: {
          name: true,
        },
        enrollees: {
          id: false,
        },
      },
      where: whereClause,
      relations: { mentor: true, enrollees: true },
      skip: offset,
      take: pageSize,
    });

    return { classrooms: classrooms, totalItems: count };
  }
}

export { GetClassroomsService };
