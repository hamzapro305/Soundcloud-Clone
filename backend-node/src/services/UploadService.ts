import { Request } from "express";
import { Storage } from "firebase-admin/lib/storage/storage";
import { storage } from "../config/Firebase";

export class UploadService {
    private storage: Storage;
    constructor() {
        this.storage = storage;
    }

    public uploadData(File: Express.Multer.File, filePath: string, req: Request): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const chunkSize = 1 * 1024 * 1024;
            const bucket = this.storage.bucket();

            const blob = bucket.file(filePath, {
            });
            try {
                await blob.save(File.buffer, {
                    chunkSize: chunkSize,
                    gzip: true,
                    contentType: File.mimetype,
                })
                resolve("finish")
            } catch (error) {
                console.log(error)
                reject(error)
            }

        })

    }

    downloadData(fileName: string, destinationPath: NodeJS.WritableStream) {
        return new Promise((resolve, reject) => {
            const bucket = this.storage.bucket();
            const file = bucket.file(fileName);

            const readStream = file.createReadStream();

            readStream.on('error', (error) => {
                reject(error);
            });

            readStream.on('end', () => {
                resolve(`File ${fileName} downloaded successfully!`);
            });

            readStream.pipe(destinationPath);
        });
    }
}
