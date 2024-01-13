import { singleton } from "tsyringe";
import { storage as Storage } from "../config/Firebase";

import fs from "fs";

class UploadService {
    private readonly storage: typeof Storage;

    constructor() {
        this.storage = Storage;
    }

    public uploadDataUsingMemoryStorage(
        File: Express.Multer.File,
        filePath: string
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const bucket = this.storage.bucket();

            const blob = bucket.file(filePath);

            try {
                await blob.save(File.buffer, {
                    gzip: true,
                    contentType: File.mimetype,
                });
                resolve("finish");
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
    public uploadDataUsingDiskStorage(
        File: Express.Multer.File,
        filePath: string
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const bucket = this.storage.bucket();

            const fileStream = fs.createReadStream(File.path);

            const fileUpload = bucket.file(filePath);
            const writableStream = fileUpload.createWriteStream({});

            fileStream
                .pipe(writableStream)
                .on("error", (error) => {
                    console.error(error);
                    this.deleteFile(File.path);
                    reject(error);
                })
                .on("finish", () => {
                    this.deleteFile(File.path);
                    resolve(true);
                });
        });
    }
    private deleteFile(path: string) {
        try {
            fs.unlink(path, (error) => {
                if (error) {
                    console.error("Error deleting file:", error);
                } else {
                    // console.log('File deleted successfully');
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default UploadService;
