import { userRepository } from "../repositories/userRepository";
import { Roles } from "../enums/Roles";

interface AutomataRequest {
  userId: number;
}

class GetUserIsAdminService {
  async execute({ userId }: AutomataRequest): Promise<boolean> {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["roles"],
    });
    return user?.roles?.some((role) => role.name === Roles.admin) ?? false;
  }
}

export { GetUserIsAdminService };
