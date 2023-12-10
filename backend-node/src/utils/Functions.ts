import formidable from "formidable";
import { MimeData, MimeTypes } from "../@Types/MimeType";

export const ExtractFileFromFormidableFiles = (Files: formidable.Files<string>, fileName: string): formidable.File | undefined => {
    const file = Files && Files[fileName] && Files[fileName]
    if (!file) return undefined
    return file[0];
}

export const GetExtensionFromMime = (Mime: MimeTypes["mimeType"]): MimeTypes["ext"] => {
    return MimeData.filter(m => m.mimeType === Mime)[0].ext
}

export const NSecondPromise = (N: number) => new Promise(resolve => setTimeout(resolve, N * 1000));
