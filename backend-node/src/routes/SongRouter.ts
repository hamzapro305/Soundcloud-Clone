import { Router } from "express";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";
import AuthMiddleware from "../passport/AuthMiddleware";
import SongController from "../controllers/SongController";
import { MulterConfigured } from "../config/Multer";

const SongRouter = Router();
const resolve = container.resolve;

const upload = MulterConfigured([".mp3"], { type: "RAM" });

const [validator, authMiddleware, songController] = [
    resolve(Validation),
    resolve(AuthMiddleware),
    resolve(SongController),
];

SongRouter.post(
    "/create",
    authMiddleware.isLoggedIn,
    validator.createSongValidator,
    songController.createSong
);

SongRouter.put(
    "/update",
    authMiddleware.isLoggedIn,
    validator.updateSongValidator,
    songController.updateSong
);
SongRouter.post(
    "/upload",
    // authMiddleware.isLoggedIn,
    upload.single("Song"),
    songController.uploadSong
);

export default SongRouter;
