import { NextFunction, Request, Response } from "express";
import { UploadService } from "../services/UploadService";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { GetExtensionFromMime } from "../utils/Functions";
import { MimeType } from "../@Types/MimeType";


class TestController {
    public getTest(req: Request, res: Response) {
        res.status(200).send("test done ")
    }
    public async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            const file = req?.file;
            const uploadService = new UploadService();
            if (file) {
                const fileExt = GetExtensionFromMime(file.mimetype as MimeType["mimeType"])
                await uploadService.uploadDataUsingMemoryStorage(file, `test/${Date.now()}${fileExt}`);
                return res.status(HttpStatusCode.OK).json({ message: "File Uploaded!" })
            } else {
                throw new CustomError("File is empty", HttpStatusCode.BAD_REQUEST);
            }
        } catch (error) {
            next(error)
        }


    }
}

export default new TestController()