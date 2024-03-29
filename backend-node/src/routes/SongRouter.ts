import { Router } from "express";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";
import AuthMiddleware from "../passport/AuthMiddleware";
import SongController from "../controllers/SongController";
import LikeController from "../controllers/LikeController";
import { MulterConfigured } from "../config/Multer";

const SongRouter = Router();
const resolve = container.resolve;

const upload = MulterConfigured([".mp3"], { type: "RAM" });

const validator = container.resolve(Validation)
const authMiddleware= container.resolve(AuthMiddleware)
const songController= container.resolve(SongController)
const likeController= container.resolve(LikeController)

SongRouter.put(
    "/update",
    authMiddleware.isLoggedIn,
    validator.updateSongValidator,
    songController.updateSong
);

SongRouter.get(
    "/all-songs",
    songController.getSongs
)

SongRouter.get(
    "/single-song/:song_id/:user_id",
    validator.getSongValidator,
    songController.getSong
)

SongRouter.post(
    "/upload",
    authMiddleware.isLoggedIn,
    upload.single("Song"),
    songController.uploadSong
);
SongRouter.post(
    "/like",
    likeController.toggleLike
);

SongRouter.put(
    "/increment-playcount/:songID",
    songController.incrementPlayCount
);

export default SongRouter;
