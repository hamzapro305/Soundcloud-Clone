import { Router } from "express";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";
import AuthMiddleware from "../passport/AuthMiddleware";
import SongController from "../controllers/SongController";

const SongRouter = Router();

const validator = container.resolve(Validation);
const authMiddleware = container.resolve(AuthMiddleware);
const songController = container.resolve(SongController);

SongRouter.post(
    "/create",
    authMiddleware.isLoggedIn,
    validator.createSongValidator,
    songController.createSong
);

SongRouter.post(
    "/update",
    authMiddleware.isLoggedIn,
    validator.updateSongValidator,
    songController.createSong
);

export default SongRouter;
