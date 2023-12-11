import { MimeData, MimeType } from "../@Types/MimeType";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "./HttpStatusCode";

export const GetExtensionFromMime = (Mime: MimeType["mimeType"]): MimeType["ext"] => {
    return MimeData.filter(m => m.mimeType === Mime)[0]?.ext
}

export const NSecondPromise = (N: number) => new Promise(resolve => setTimeout(resolve, N * 1000));

export const ThrowCriticalError = (error: any) => {
    throw new CustomError(
        error?.message as string || 'Internal Server Error',
        error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
    );
}