import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const UserAlreadyExists = await this.usersRepository.findById(id);

    if (!UserAlreadyExists) {
      throw new AppError("This user does not exist");
    }

    this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
