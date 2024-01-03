import { InjectionToken, container } from "tsyringe";
import { MimeData, MimeType } from "../@Types/MimeType";

export const GetExtensionFromMime = (
    Mime: MimeType["mimeType"]
): MimeType["ext"] => {
    return MimeData.filter((m) => m.mimeType === Mime)[0]?.ext;
};

export const getResolvedItems = <T>(classes: InjectionToken<T>[]): T[] => {
    return classes.map((x) => container.resolve(x));
};

export const NSecondPromise = (N: number) =>
    new Promise((resolve) => setTimeout(resolve, N * 1000));
