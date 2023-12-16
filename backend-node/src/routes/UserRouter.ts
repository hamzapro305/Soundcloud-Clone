import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";
import passport from "passport";
import { AuthMiddleware } from "../passport/AuthMiddleware";
import { container } from "tsyringe";
import HttpStatusCode from "../utils/HttpStatusCode";

const UserRouter = Router();

const userController = container.resolve(UserController);
const authMiddleware = container.resolve(AuthMiddleware);

UserRouter.post("/login/password", authMiddleware.authenticateLocal(), userController.login)

UserRouter.post("/login/google", passport.authenticate("local"))

UserRouter.get("/logout", userController.logout)

UserRouter.post("/signup/password", userController.signUp)

export default UserRouter;