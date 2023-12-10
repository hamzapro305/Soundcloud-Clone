import multer, { Multer } from "multer";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { MimeTypes } from "../@Types/MimeType";
import { GetExtensionFromMime } from "../utils/Functions";

export const MulterConfigured = (Types: MimeTypes["ext"][]): multer.Multer => {
    return multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, File, cb) => {
            const FileExt = GetExtensionFromMime(File.mimetype as MimeTypes["mimeType"])
            if (Types.includes(FileExt)) {
                cb(null, true);
            } else {
                cb(
                    new CustomError(
                        `File of extension: ${FileExt} Not allowed`,
                        HttpStatusCode.NOT_ACCEPTABLE
                    )
                );
            }
        },
    })
}

