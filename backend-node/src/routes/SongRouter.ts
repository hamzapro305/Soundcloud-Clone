import { Router } from "express";
import { container } from "tsyringe";
import Validation from "../Middlewares/Validation";

const SongRouter = Router()

const validator = container.resolve(Validation)

SongRouter.post(
    "/",
    validator.createSongValidator
)

export default SongRouter;