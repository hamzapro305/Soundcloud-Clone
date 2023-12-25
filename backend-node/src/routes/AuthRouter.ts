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
    "/login/verify",
    authMiddleware.isLoggedIn,
    (req, res) => res.status(HttpStatusCode.OK).json({ message: "user authenticated" })
)
AuthRouter.post(
    "/login/password",
    validation.UserLoginValidator,
    authMiddleware.authenticateLocal,
    authController.login
);
AuthRouter.post(
    "/signup/password",
    validation.UserLoginValidator,
    authController.signUp
);

AuthRouter.get(
    "/login/google",
    passport.authenticate("google", {
        scope: ["email", "profile"]
    })
);
AuthRouter.get(
    "/login/facebook",
    passport.authenticate("facebook")
);

AuthRouter.get(
    "/login/google/callback",
    authMiddleware.googleCallback
);
AuthRouter.get(
    "/login/facebook/callback",
    authMiddleware.facebookCallback
);

export default AuthRouter;
