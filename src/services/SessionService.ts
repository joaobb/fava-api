// import { UserRepository } from "../repositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/http-errors";

interface UserRequest {
  email: string;
  password: string;
}

interface UserResponse {
  userId: number;
  accessToken: string;
  role: number;
}

export class SessionService {
  async execute({ email, password }: UserRequest): Promise<UserResponse> {
    const user = await userRepository.findOne({
      where: { email },
      relations: ["roles"],
    });

    if (!user) throw new BadRequestError("Email or Password is incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new BadRequestError("Email or Password is incorrect");

    if (!process.env.JWT_SECRET)
      throw new BadRequestError("Email or Password is incorrect");

    const userRole = Number(user.roles?.[0]?.id);

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

    return { userId: user.id, accessToken: token, role: userRole };
  }
}
