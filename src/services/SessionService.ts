// import { UserRepository } from "../repositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";

interface UserRequest {
  email: string;
  password: string;
}

export class SessionService {
  async execute({ email, password }: UserRequest) {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new Error("Email or Password is incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("Email or Password is incorrect");

    if (!process.env.JWT_SECRET)
      throw new Error("Email or Password is incorrect");

    const token = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: String(user.id),
      }
    );

    return { access_token: token };
  }
}
