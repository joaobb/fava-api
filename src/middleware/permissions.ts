import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { GetUserIsAuthorOrAdminService } from "../services/GetUserIsAuthorOrAdminService";
import { EntityTarget, ObjectLiteral } from "typeorm";
import { Roles } from "../enums/Roles";

export function is(roles: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["roles"],
    });

    if (!user) return response.status(400).json("User does not exists");

    const userRoles = user.roles.map((role) => role.name);
    const userHasRoles = userRoles.some((role) => roles.includes(role));

    if (!userHasRoles) return response.status(401).end();

    request.isAdmin = roles.includes(Roles.admin);

    return next();
  };
}

export function authorOrAdminOnly(
  idParamName: string,
  Entity: EntityTarget<ObjectLiteral>
) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const elementId = Number(request.params[idParamName]);
    const { userId } = request;

    if (!elementId) return response.status(401).end();

    const getUserIsAuthorOrAdminService = new GetUserIsAuthorOrAdminService();
    const isAuthorOrAdmin = await getUserIsAuthorOrAdminService.execute({
      userId,
      elementId,
      Entity,
    });

    if (!isAuthorOrAdmin) return response.status(401).end();

    return next();
  };
}
