import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    nome,
    email,
    telefone,
    cargo,
    empresa,
    foto
    
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
    id,
    nome,
    email,
    telefone,
    cargo,
    empresa,
    foto
    });

    await this.repository.save(user);
  }

    async findByEmail(email: string): Promise<User> {
      const user = await this.repository.findOne({ email });
      return user;
  }
}

export { UsersRepository };
