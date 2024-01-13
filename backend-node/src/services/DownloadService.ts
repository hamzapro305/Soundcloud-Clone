import { singleton } from "tsyringe";
import { storage as Storage } from "../config/Firebase";
import internal from "stream";

@singleton()
class DownloadService {
    private readonly storage: typeof Storage;
    constructor() {
        this.storage = Storage;
    }
    public readonly downloadDataBuffer = (
        filePath: string
    ): Promise<Buffer> => {
        return new Promise((resolve, reject) => {
            const bucket = this.storage.bucket();
            const file = bucket.file(filePath);

            const readStream = file.createReadStream();
            const chunks: Buffer[] = [];

            readStream.on("data", (chunk) => {
                chunks.push(chunk);
            });

            readStream.on("error", (error) => {
                reject(error);
            });

            readStream.on("end", () => {
                const fileData = Buffer.concat(chunks);
                resolve(fileData);
            });
        });
    };
    public readonly downloadDataStream = (
        filePath: string
    ): internal.Readable => {
        const bucket = this.storage.bucket();
        const file = bucket.file(filePath);
        const readStream = file.createReadStream();
        return readStream;
    };
}

export default DownloadService;
