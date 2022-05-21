import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, email, telefone, cargo, empresa } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      nome,
      email,
      telefone,
      cargo,
      empresa,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
