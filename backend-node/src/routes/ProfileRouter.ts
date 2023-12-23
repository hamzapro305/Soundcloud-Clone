import { Router } from "express";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";
import ProfileController from "../controllers/ProfileController";
import AuthMiddleware from "../passport/AuthMiddleware";

const profileRouter = Router();

const validator = container.resolve(Validation);
const profileController = container.resolve(ProfileController);
const authMiddleware = container.resolve(AuthMiddleware);

profileRouter.post(
    "/update/uid/",
    authMiddleware.isLoggedIn,
    validator.UpdateProfileByUIDValidator,
    profileController.updateProfile
);

profileRouter.get("/get/uid/", authMiddleware.isLoggedIn);

export default profileRouter;
