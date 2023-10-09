import { userRepository } from "../../../users/port/userRepository";
import { User } from "../../../users/user/user";
import prisma from "../../prisma/film/client";
import bcrypt from "bcrypt";

export class userSQLRepository implements userRepository {
  async signIn(user: User): Promise<User | undefined> {
    const userExist = await prisma.user.findFirst({
      where: { firstName: user.firstName, lastName: user.lastName },
    });
    if (
      userExist &&
      (await bcrypt.compare(user.password, userExist.password))
    ) {
      return userExist;
    } else {
      return new Promise((resolve, reject) => {
        reject(new Error("please check your credentials"));
      });
    }
  }

  async signUp(user: User): Promise<User | undefined> {
    const userExist = await prisma.user.findFirst({
      where: { firstName: user.firstName, lastName: user.lastName },
    });
    if (userExist) {
      return new Promise((resolve, reject) => {
        reject(new Error("user already exist"));
      });
    } else {
      const passwordUser = await bcrypt.hash(user.password, 10);

      return await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          password: passwordUser,
        },
      });
    }
  }
}
