import HttpStatusCode from "../utils/HttpStatusCode";
import { CustomError } from "./CustomError";

export class ThrowCriticalError extends Error {
    constructor(error: any) {
        super()
        throw new CustomError(
            error?.message as string || 'Internal Server Error',
            error?.httpCode || HttpStatusCode.INTERNAL_SERVER_ERROR
        );
    }
}