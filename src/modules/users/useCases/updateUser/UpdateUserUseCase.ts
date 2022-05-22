import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    nome,
    email,
    telefone,
    cargo,
    empresa,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user.id) {
      throw new AppError("User not exists");
    }

    if (email !== user.email) {
      const EmailAlreadyExists = await this.usersRepository.findByEmail(email);
      if (EmailAlreadyExists) {
        throw new AppError("Email already exists");
      }
    }

    user.nome = nome ? nome : user.nome;
    user.email = email ? email : user.email;
    user.telefone = telefone ? telefone : user.telefone;
    user.cargo = cargo ? cargo : user.cargo;
    user.empresa = empresa ? empresa : user.empresa;

    await this.usersRepository.update(user);

    return user;
  }
}

export { UpdateUserUseCase };
