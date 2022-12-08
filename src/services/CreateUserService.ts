import { UserRepository } from "../repositories";
import { hash } from "bcryptjs";

interface UserRequest {
  email: string;
  name: string;
  password: string;
}

export class CreateUserService {
  async execute({ email, name, password }: UserRequest) {
    const userExists = await UserRepository().findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);
    const user = UserRepository().create({
      email,
      name,
      password: passwordHash,
    });

    await UserRepository().save(user);

    return user;
  }
}
