import { Response } from "express";
import { CustomError } from "./CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

export class ErrorHandler {
    private isTrustedError(error: Error): boolean {
        if (error instanceof CustomError) {
            return true;
        }
        return false;
    }
    
    private handleTrustedError(error: CustomError, response: Response): void {
        response.status(error.httpCode).json({ message: error.message });
    }

    private handleCriticalError(error: Error | CustomError, response?: Response): void {
        console.trace(error)
        if (response) {
            response
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: 'Internal server error' });
        }

        console.log('Application encountered a critical error');
        // process.exit(1);
    }


    public handleError(error: Error | CustomError, response?: Response): void {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as CustomError, response);
        } else {
            this.handleCriticalError(error, response);
        }
    }
}