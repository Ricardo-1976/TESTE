import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";


interface IQuery {
  limit?:number;
  page?:number
}

class ListUsersController {
  async handle(request: Request<any,any,any,IQuery>, response: Response): Promise<Response> {
    const { limit,page}  = request.query;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const user = await listUsersUseCase.execute({
        limit,page
    });

    return response.status(201).json(user);
  }
}

export {ListUsersController };
