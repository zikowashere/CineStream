import { userRepository } from "../port/userRepository";
import { User } from "../user/user";

export class SignUp {
  userRepository: userRepository;

  constructor(userRepository: userRepository) {
    this.userRepository = userRepository;
  }

  signUp = async (user: User) => {
    return await this.userRepository.signUp(user);
  };
}
