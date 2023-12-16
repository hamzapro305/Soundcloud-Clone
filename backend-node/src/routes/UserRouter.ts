import { Router } from "express";
import { UserController } from "../controllers/UserController";
import passport from "passport";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";
import AuthMiddleware from "../passport/AuthMiddleware";

const UserRouter = Router();

const userController = container.resolve(UserController);
const authMiddleware = container.resolve(AuthMiddleware);

UserRouter.post("/login/password", Validation.UserLoginValidator, authMiddleware.authenticateLocal, userController.login)

UserRouter.post("/login/google", passport.authenticate("local"))

UserRouter.get("/logout", userController.logout)

UserRouter.post("/signup/password", userController.signUp)

export default UserRouter;