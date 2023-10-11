import { userRepository } from "../../../users/port/userRepository";
import { SignIn } from "../../../users/useCases.ts/signIn";
import { SignUp } from "../../../users/useCases.ts/signUp";
import { User } from "../../../users/user/user";

export default class UserController {
  userRepository: userRepository;

  constructor(userRepository: userRepository) {
    this.userRepository = userRepository;
  }

  async signUp(user: User) {
    const userToCreate = new SignUp(this.userRepository);
    return await userToCreate.signUp(user);
  }
  async signIn(user: User) {
    const userToGet = new SignIn(this.userRepository);
    return await userToGet.signIn(user);
  }
}
