import { MimeData, MimeType } from "../@Types/MimeType";

export const GetExtensionFromMime = (Mime: MimeType["mimeType"]): MimeType["ext"] => {
    return MimeData.filter(m => m.mimeType === Mime)[0]?.ext
}

export const NSecondPromise = (N: number) => new Promise(resolve => setTimeout(resolve, N * 1000));
