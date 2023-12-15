import { Router } from "express";
import { UserController } from "../controllers/UserController";
import passport from "passport";
import { AuthMiddleware } from "../passport/AuthMiddleware";

const UserRouter = Router();

const userController = new UserController()
const authMiddleware = new AuthMiddleware()

UserRouter.post("/login/password", authMiddleware.authenticateLocal(), userController.login)
UserRouter.post("/login/google", passport.authenticate("local"))

UserRouter.get("/logout", userController.logout)

UserRouter.post("/signup/password", userController.signUp)

export default UserRouter;