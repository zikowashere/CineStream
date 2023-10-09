import { userRepository } from "../port/userRepository";
import { User } from "../user/user";

export class SignIn {
  userRepository: userRepository;

  constructor(userRepository: userRepository) {
    this.userRepository = userRepository;
  }

  signIn = async (user: User) => {
    return await this.userRepository.signIn(user);
  };
}
