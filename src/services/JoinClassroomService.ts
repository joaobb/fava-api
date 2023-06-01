import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/http-errors";
import { Classroom } from "../entities/ClassRoom";
import { classroomRepository } from "../repositories/classroomRepository";

interface JoinClassroomRequest {
  userId: number;
  invitationToken: string;
}

class JoinClassroomService {
  async execute({
    userId,
    invitationToken,
  }: JoinClassroomRequest): Promise<Classroom> {
    if (!invitationToken)
      throw new BadRequestError("Invalid classroom invitation token");

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new BadRequestError("User not found");

    const classroom = await classroomRepository.findOne({
      where: {
        invitationToken,
      },
      relations: { enrollees: true },
    });

    if (!classroom)
      throw new BadRequestError("No classroom found for this invitation token");

    if (classroom.enrollees.some((enrollee) => enrollee.id === userId))
      throw new BadRequestError("The user already joined the classroom");

    classroom.enrollees.push(user);

    return await classroomRepository.save(classroom);
  }
}

export { JoinClassroomService };
