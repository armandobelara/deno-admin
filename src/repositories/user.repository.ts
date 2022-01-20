import { User } from "../models/user.ts";
import { manager } from "../database/connection.ts";

export class UserRepository {
  async findOne(key: any, value: any) {
    return manager.query(User).where(key, value).first();
  }

  async create(user: User) {
    return manager.save(user);
  }
}