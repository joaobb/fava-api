import { userRepository } from "../repositories/userRepository";
import { hash } from "bcryptjs";
import { Roles } from "../enums/Roles";
import { roleRepository } from "../repositories/roleRepository";
import { In } from "typeorm";
import { BadRequestError } from "../helpers/http-errors";

interface UserRequest {
  email: string;
  name: string;
  password: string;
  roles: string[];
}

const userRegisterableRoles = [Roles.teacher, Roles.student];

export class CreateUserService {
  async execute({ email, name, password, roles }: UserRequest) {
    const userExists = await userRepository.findOneBy({
      email,
    });

    if (userExists) throw new BadRequestError("User already exists");

    const filteredRoles = roles.filter((role) =>
      userRegisterableRoles.includes(role)
    );

    const userRoles = await roleRepository.find({
      where: { name: In(filteredRoles) },
    });

    if (!userRoles?.length) throw new BadRequestError("Invalid role");

    const passwordHash = await hash(password, 8);
    const user = userRepository.create({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      password: passwordHash,
      roles: userRoles,
    });

    await userRepository.save(user);

    return { id: user.id, name: user.name, email: user.email };
  }
}
