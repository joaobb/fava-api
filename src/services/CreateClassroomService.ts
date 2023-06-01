import ShortUniqueId from "short-unique-id";

import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/http-errors";
import { classroomRepository } from "../repositories/classroomRepository";

interface ClassroomRequest {
  name: string;
  description: string;
  userId: number;
}

export class CreateClassroomService {
  async execute({ name, description, userId }: ClassroomRequest) {
    const mentor = await userRepository.findOneBy({ id: userId });
    if (!mentor) throw new BadRequestError("Mentor not found");

    const invitationTokenGenerator = new ShortUniqueId({ length: 10 });
    let uniqueInvitationToken: string;

    do {
      uniqueInvitationToken = invitationTokenGenerator();
    } while (
      await classroomRepository.findOneBy({
        invitationToken: uniqueInvitationToken,
      })
    );

    const classroom = classroomRepository.create({
      name: name.trim(),
      description: description.trim(),
      invitationToken: uniqueInvitationToken,
      mentor,
    });

    await classroomRepository.save(classroom);

    return {
      id: classroom.id,
      invitationToken: classroom.invitationToken,
    };
  }
}
