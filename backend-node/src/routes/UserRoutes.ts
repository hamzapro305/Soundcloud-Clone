import { Router } from "express";
import userController from "../controllers/UserController";
const UserRouter = Router();

UserRouter.post("/signup", userController.signUp)

UserRouter.post("/login", userController.logIn)


export default UserRouter;