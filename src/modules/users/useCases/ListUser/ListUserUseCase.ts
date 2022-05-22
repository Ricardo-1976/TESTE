import { IListUserDTO } from "@modules/users/dtos/IListUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
 limit,page
  }: IListUserDTO
  ): Promise<any> {
    
    const user = await this.usersRepository.list({
      limit,page

    });

    return user;
  }
}

export { ListUserUseCase };
