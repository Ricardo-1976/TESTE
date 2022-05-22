import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ImportUserController } from "@modules/users/useCases/importUser/ImportUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";
import { UpdateAvatarController } from "@modules/users/useCases/updateAvatar/UpdateAvatarController";
import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { ListUserController } from "@modules/users/useCases/listUser/ListUserController";

import { Router } from "express";
import multer from "multer";

const usersRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

import uploadConfig from "@config/upload";



const createUserController = new CreateUserController();
const importUserController = new ImportUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateAvatarController = new UpdateAvatarController();
const listUsersController = new ListUsersController();
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

// List Users
usersRoutes.get("/users", listUsersController.handle);

// List User
usersRoutes.get("/:id", listUserController.handle);

export { usersRoutes };

