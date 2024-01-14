import { Router } from "express";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";
import ProfileController from "../controllers/ProfileController";
import AuthMiddleware from "../passport/AuthMiddleware";

const profileRouter = Router();
const resolve = container.resolve;

const validator = container.resolve(Validation)
const authMiddleware= container.resolve(AuthMiddleware)
const profileController= container.resolve(ProfileController)

profileRouter.post(
    "/update/uid/",
    authMiddleware.isLoggedIn,
    validator.UpdateProfileByUIDValidator,
    profileController.updateProfile
);

profileRouter.get("/get/uid/", authMiddleware.isLoggedIn);

profileRouter.get("/profile-pic/:uid", profileController.getProfilePic);

export default profileRouter;
