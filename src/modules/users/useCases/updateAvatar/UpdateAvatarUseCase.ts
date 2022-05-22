import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file}: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.foto) {
      await deleteFile(`./tmp/avatar/${user.foto}`);
    }

    user.foto = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateAvatarUseCase };
