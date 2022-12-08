// import { UserRepository } from "../repositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface UserRequest {
  email: string;
  password: string;
}

export class SessionService {
  async execute({ email, password }: UserRequest) {
    console.log({ email, password });
    // const repository = UserRepository();
    //
    // const user = await repository.findOne({ where: { email } });
    //
    // if (!user) throw new Error("User does not exists");
    //
    // const passwordMatch = await compare(password, user.password);
    //
    // if (!passwordMatch) throw new Error("Email or Password is incorrect");
    //
    // if (!process.env.SECRET_JWT)
    //   throw new Error("Email or Password is incorrect");
    //
    // const token = sign({}, process.env.SECRET_JWT, {
    //   subject: user.id,
    // });

    return { token: 1 };
  }
}
