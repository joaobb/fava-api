import { userRepository } from "../repositories/userRepository";
import { hash } from "bcryptjs";

interface UserRequest {
  email: string;
  password: string;
}

export class SignInService {
  async execute({ email, password }: UserRequest) {
    const userExists = await userRepository.findOneBy({
      email,
    });

    if (!userExists) throw new Error("Email/password is incorrect");

    const passwordHash = await hash(password, 8);
    const user = userRepository.create({
      email,
      password: passwordHash,
    });

    await userRepository.save(user);

    return { id: user.id, email: user.email, name: user.email };
  }
}
