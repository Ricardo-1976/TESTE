import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ImportUserController } from "@modules/users/useCases/importUser/ImportUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { UpdateAvatarController } from "@modules/users/useCases/updateAvatar/UpdateAvatarController";

import { Router } from "express";
import multer from "multer";

const usersRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

import uploadConfig from "@config/upload";
import { ListUserController } from "@modules/users/useCases/ListUser/ListUserController";


const createUserController = new CreateUserController();
const importUserController = new ImportUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateAvatarController = new UpdateAvatarController();
const listUserController = new ListUserController();

const  uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

// Create User
usersRoutes.post("/", createUserController.handle);

// Import file SVC
usersRoutes.post("/import", upload.single("file"), importUserController.handle);

// Update a new user
usersRoutes.put("/update/:id", updateUserController.handle);

// Delete a new user
usersRoutes.delete("/delete/:id", deleteUserController.handle);

// Update avatar the user
usersRoutes.patch("/avatar/:id",uploadAvatar.single("avatar"), updateAvatarController.handle);

// List User
usersRoutes.get("/user", listUserController.handle);

export { usersRoutes };

