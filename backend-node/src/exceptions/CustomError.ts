import HttpStatusCode from "../utils/HttpStatusCode";

export class CustomError extends Error {
    public message: string;
    public httpCode: HttpStatusCode

    constructor(message: string, httpCode: HttpStatusCode) {
        super(message);

        this.message = message;
        this.httpCode = httpCode;

        // Set the prototype explicitly
        Object.setPrototypeOf(this,CustomError.prototype)
    }
}