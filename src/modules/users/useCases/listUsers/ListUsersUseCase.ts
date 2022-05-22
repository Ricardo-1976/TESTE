import { IListUserDTO } from "@modules/users/dtos/IListUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    limit,page
  }: IListUserDTO): Promise<any> {
    
    const user = await this.usersRepository.list({
      limit,page

    });

    return user;
  }
}

export { ListUsersUseCase };
