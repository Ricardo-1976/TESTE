import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserUseCase} from "./ListUserUseCase";

interface IQuery {
  limit?:number;
  page?:number
}

class ListUserController {
  async handle(request: Request<any,any,any,IQuery>, response: Response): Promise<Response> {
    const { limit,page}  = request.query;

    const listUserUseCase = container.resolve(ListUserUseCase);

    const user = await listUserUseCase.execute({
          limit,page
    });

    return response.status(201).json(user);
  }
}

export {ListUserController };
