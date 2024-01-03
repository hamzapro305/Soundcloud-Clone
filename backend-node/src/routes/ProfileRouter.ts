import { Router } from "express";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";
import ProfileController from "../controllers/ProfileController";
import AuthMiddleware from "../passport/AuthMiddleware";

const profileRouter = Router();
const resolve = container.resolve;

const [validator, profileController, authMiddleware] = [
    resolve(Validation),
    resolve(ProfileController),
    resolve(AuthMiddleware),
];

profileRouter.post(
    "/update/uid/",
    authMiddleware.isLoggedIn,
    validator.UpdateProfileByUIDValidator,
    profileController.updateProfile
);

profileRouter.get("/get/uid/", authMiddleware.isLoggedIn);

export default profileRouter;
