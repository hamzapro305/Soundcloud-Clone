import multer from "multer";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { MimeType } from "../@Types/MimeType";
import { GetExtensionFromMime } from "../utils/Functions";

type StorageT = { type: "RAM" } | { type: "DISK", tempPath: string }

export const MulterConfigured = (Types: MimeType["ext"][], StorageType: StorageT): multer.Multer => {
    return multer({

        storage: StorageType.type === "DISK" ?
            multer.diskStorage({
                destination(req, file, callback) {
                    callback(null, StorageType.tempPath)
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

