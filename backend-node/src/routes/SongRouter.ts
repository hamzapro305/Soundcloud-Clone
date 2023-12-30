import { Router } from "express";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";
import AuthMiddleware from "../passport/AuthMiddleware";

const SongRouter = Router()

const validator = container.resolve(Validation)
const authMiddleware = container.resolve(AuthMiddleware)
const songController = container.resolve(SongController)

SongRouter.post(
    "/",
    authMiddleware.isLoggedIn,
    validator.createSongValidator,

)

export default SongRouter;