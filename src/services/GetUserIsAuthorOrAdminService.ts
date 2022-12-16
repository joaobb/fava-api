import { EntityTarget, ObjectLiteral } from "typeorm";
import { getRepositoryFromEntity } from "../repositories/getRepositoryFromEntity";
import { GetUserIsAdminService } from "./GetUserIsAdminService";

interface AutomataRequest {
  userId: number;
  elementId: number;
  Entity: EntityTarget<ObjectLiteral>;
}

class GetUserIsAuthorOrAdminService {
  async execute({
    userId,
    elementId,
    Entity,
  }: AutomataRequest): Promise<Boolean> {
    try {
      const entityRepository = getRepositoryFromEntity(Entity);

      if (!entityRepository) return false;

      const elementAuthoredByUser = await entityRepository.findOneBy({
        id: elementId,
        author: {
          id: userId,
        },
      });

      if (!elementAuthoredByUser) {
        const getUserIsAdminService = new GetUserIsAdminService();
        return getUserIsAdminService.execute({ userId });
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}

export { GetUserIsAuthorOrAdminService };
