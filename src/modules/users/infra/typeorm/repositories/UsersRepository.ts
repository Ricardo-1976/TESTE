import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IListUserDTO } from "@modules/users/dtos/IListUserDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
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
    foto,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      nome,
      email,
      telefone,
      cargo,
      empresa,
      foto,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }

  async update({
    id,
    nome,
    email,
    telefone,
    cargo,
    empresa,
  }: IUpdateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      nome,
      email,
      telefone,
      cargo,
      empresa,
    });

    await this.repository.save(user);

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async list(data: IListUserDTO): Promise<any> {

    const { page=1, limit=20 } = data

     const salto = (page - 1) * limit;
    
    const [user, register] =  await this.repository.findAndCount({
      take:limit,
      skip:salto
    })

    return { data:user, register, page, limit}
  }
}

export { UsersRepository };
