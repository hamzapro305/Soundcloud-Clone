import { Router } from "express";
import { UserController } from "../controllers/UserController";
import passport from "passport";
import { container } from "tsyringe";

const UserRouter = Router();

const userController = container.resolve(UserController);



export default UserRouter;