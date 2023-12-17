import { NextFunction, Request, Response } from "express";
import { UploadService } from "../services/UploadService";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { GetExtensionFromMime } from "../utils/Functions";
import { MimeType } from "../@Types/MimeType";
import { autoInjectable, inject } from "tsyringe";
import axios from "axios";

@autoInjectable()
class TestController {
    constructor(
        @inject(UploadService)
        private _uploadService: UploadService
    ) {}

    public getTest(req: Request, res: Response) {
        axios
            .get("https://www.googleapis.com/oauth2/v2/userinfo", {
                headers: {
                    Authorization: `Bearer ya29.a0AfB_byAJPBWtkrnr6o0zJay1jNTzcplfnFBrqiqLwh_u2l9tn47A97O3hS3W_SIwdIEYnw90WnuE60NFpIJEAHEfr4LCj5DVt1Wz-A_Pzf-TaJqqga4lCZ-5V1oUb-BC3bgDRqsIuRU1O4yilA3fkqTWDpshU17p1QaCgYKAboSARISFQHGX2Miuc3o-_uaB2UIBaHT9YVFcA0169`,
                },
            })
            .then((response) => {
                // Handle the user information received from Google API
                console.log("User Info:", response.data);
                res.status(200).send("test done ");
            })
            .catch((error) => {
                // Handle errors
                console.error(
                    "Error fetching user information:",
                    error.response ? error.response.data : error.message
                );
                res.status(200).send("test false ");
            });
    }
    public async uploadFile(req: Request, res: Response, next: NextFunction) {
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
    }
}

export default TestController;
