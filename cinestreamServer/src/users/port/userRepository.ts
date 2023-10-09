import { User } from "../user/user";

export interface userRepository {
  signIn(user: User): Promise<User | undefined>;
  signUp(user: User): Promise<User | undefined>;
}
