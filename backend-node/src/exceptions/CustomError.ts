import HttpStatusCode from "../utils/HttpStatusCode";

export class CustomError extends Error {
    public message: string;
    public httpCode: HttpStatusCode

    constructor(message: string, httpCode: HttpStatusCode) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.message = message;
        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}