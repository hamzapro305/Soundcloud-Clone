import multer from "multer";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { MimeType } from "../@Types/MimeType";
import { GetExtensionFromMime } from "../utils/Functions";

export const MulterConfigured = (Types: MimeType["ext"][], StorageType: "DISK" | "RAM"): multer.Multer => {
    return multer({

        storage: StorageType === "DISK" ?
            multer.diskStorage({
                destination(req, file, callback) {
                    callback(null, "temp/")
                },
                filename(req, file, callback) {
                    callback(null, Date.now() + ' - ' + file.originalname)
                }
            })
            : multer.memoryStorage(),

        fileFilter: (req, File, cb) => {
            const FileExt = GetExtensionFromMime(File.mimetype as MimeType["mimeType"])
            if (Types.includes(FileExt)) {
                cb(null, true);
            } else {
                cb(
                    new CustomError(
                        `File of extension: ${FileExt} Not allowed`,
                        HttpStatusCode.UNSUPPORTED_MEDIA_TYPE
                    )
                );
            }
        },
    })
}

