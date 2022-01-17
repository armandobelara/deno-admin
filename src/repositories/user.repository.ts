import { User } from "../models/user.ts";
import { manager } from "../database/connection.ts";

export class UserRepository {
  async create(user: User) {
    return manager.save(user);
  }
}