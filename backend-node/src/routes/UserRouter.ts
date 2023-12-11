import { Router } from "express";
import userController from "../controllers/UserController";

const UserRouter = Router();
UserRouter.post("/signup", userController.signUp)

export default UserRouter;