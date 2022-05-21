import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { Router } from "express";

const usersRoutes = Router();

const createUserController = new CreateUserController();

// Create User
usersRoutes.post("/", createUserController.handle);

export { usersRoutes };

