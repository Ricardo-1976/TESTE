import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IListUserDTO } from "../dtos/IListUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
  list(data:IListUserDTO): Promise<User[]>;
}

export { IUsersRepository };

