import { NextFunction, Request, Response } from "express";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { GetExtensionFromMime } from "../utils/Functions";
import { MimeType } from "../@Types/MimeType";
import { inject, singleton } from "tsyringe";
import UploadService from "../services/UploadService";
import SongService from "../services/SongService";

@singleton()
class TestController {
    constructor(
        @inject(UploadService)
        private readonly _uploadService: UploadService,

        @inject(SongService)
        private readonly _songService: SongService
    ) {}

    public readonly downloadSong = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const readStream = await this._songService.getSongFile(
                "4a91c66d-3190-45cd-a9c1-4be51f5ee2de",
                "094b5faf-ff82-4b08-994c-d8a7feabcc80"
            );

            // Set headers for the response
            res.setHeader("Content-Type", "audio/mpeg");
            res.setHeader(
                "Content-Disposition",
                'attachment; filename="song.mp3"'
            );
            
            readStream?.pipe(res)

        } catch (error) {
            console.log(error);
            next(error)
        }
    };

    public readonly uploadFile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const file = req?.file;

            if (file) {
                const fileExt = GetExtensionFromMime(
                    file.mimetype as MimeType["mimeType"]
                );
                await this._uploadService.uploadDataUsingMemoryStorage(
                    file,
                    `test/${Date.now()}${fileExt}`
                );
                return res
                    .status(HttpStatusCode.OK)
                    .json({ message: "File Uploaded!" });
            } else {
                throw new CustomError(
                    "File is empty",
                    HttpStatusCode.BAD_REQUEST
                );
            }
        } catch (error) {
            next(error);
        }
    };
}

export default TestController;
