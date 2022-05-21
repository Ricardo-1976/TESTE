import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    nome,
    email,
    telefone,
    cargo,
    empresa,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    
    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    await this.usersRepository.create({
      nome,
      email,
      telefone,
      cargo,
      empresa,
    });
  }
}

export { CreateUserUseCase };
