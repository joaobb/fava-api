import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export function can(permissions: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["permissions"],
    });

    if (!user) return response.status(400).json("User does not exists");

    const userHasPermission = user.permissions
      .map((permission) => permission.name)
      .some((permission) => permissions.includes(permission));

    if (!userHasPermission) return response.status(401).end();

    return next();
  };
}

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

    request.isAdmin = roles.includes("admin");

    return next();
  };
}
