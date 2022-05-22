import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { parse as csvParse } from  "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface IImportUser {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  empresa: string;
}

@injectable()
class ImportUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  loadUsers(file: Express.Multer.File):Promise<IImportUser[]>{
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const users: IImportUser[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
       
      const [ nome, email, telefone, cargo, empresa ] = line;
      users.push({
       nome,
       email,
       telefone,
       cargo,
       empresa
     });
    })
    .on("end", () => {
      fs.promises.unlink(file.path);
      resolve(users);
    })
    .on("error", (err) => {
      reject(err);
    });
  });
}

  async execute(file: Express.Multer.File): Promise<void> {
    const users = await this.loadUsers(file);

    users.map(async (user) => {
      const { nome, email, telefone, cargo, empresa } = user;

      const existUser = await this.usersRepository.findByEmail(email);

      if(!existUser) {
        await this.usersRepository.create({
          nome,
          email,
          telefone,
          cargo,
          empresa
        });
      }
    });
  }
}

export { ImportUserUseCase };
