import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { container } from "tsyringe";

const UserRouter = Router();

const userController = container.resolve(UserController);

UserRouter.get("/:uid", userController.retrieveUser);

export default UserRouter;
