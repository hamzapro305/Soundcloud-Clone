import { Router } from "express";
import { container } from "tsyringe";
import AuthMiddleware from "../passport/AuthMiddleware";
import Validation from "../Middlewares/Validation";
import AuthController from "../controllers/AuthController";
import passport from "passport";
import HttpStatusCode from "../utils/HttpStatusCode";

const AuthRouter = Router();

const authController = container.resolve(AuthController);
const authMiddleware = container.resolve(AuthMiddleware);
const validation = container.resolve(Validation);

AuthRouter.post(
    "/login/password",
    validation.UserLoginValidator,
    authMiddleware.authenticateLocal,
    authController.login
);

AuthRouter.get(
    "/login/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);
AuthRouter.post(
    "/signup/password",
    validation.UserLoginValidator,
    authController.signUp
);
AuthRouter.get(
    "/login/google/callback",
    authMiddleware.googleCallback,
    (req, res) => {
        return res.status(HttpStatusCode.OK).json({
            token: req?.user,
            message: "success",
        });
    }
);
AuthRouter.get(
    "/login/facebook/callback",
    (req, res) => {
        return res.status(HttpStatusCode.OK).json({
            token: req?.user,
            message: "success",
        });
    }
);

export default AuthRouter;
