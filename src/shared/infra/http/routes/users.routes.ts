import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { ImportUserController } from "@modules/users/useCases/importUser/ImportUserController";
import { Router } from "express";
import multer from "multer";

const usersRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createUserController = new CreateUserController();
const importUserController = new ImportUserController();

// Create User
usersRoutes.post("/", createUserController.handle);

// Import file SVC
usersRoutes.post("/import", upload.single("file"), importUserController.handle);



export { usersRoutes };

