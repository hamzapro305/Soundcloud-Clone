import { NextFunction, Request, Response } from "express";
import { UploadService } from "../services/UploadService";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { GetExtensionFromMime } from "../utils/Functions";
import { MimeType } from "../@Types/MimeType";
import { inject, singleton } from "tsyringe";

@singleton()
class TestController {
    constructor(
        @inject(UploadService)
        private readonly _uploadService: UploadService
    ) {}

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
