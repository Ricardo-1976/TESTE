import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportUserUseCase } from "./ImportUserUseCase";



class ImportUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importUserUseCase = container.resolve(ImportUserUseCase);

     await importUserUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ImportUserController };