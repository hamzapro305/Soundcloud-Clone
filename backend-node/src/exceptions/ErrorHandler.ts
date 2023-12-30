import { Response } from "express";
import { CustomError } from "./CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import multer from "multer";

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

    private handleMulterError = (err: any, res?: Response) => {
        // Handle MulterError here
        if (res) {
            // Customize the response based on the MulterError
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                res.status(400).json({
                    error: "Unexpected file field",
                    field: err.field,
                    message:
                        "Make sure the file is sent with the correct field name according to the documentation.",
                });
            } else {
                // Handle other MulterError codes if needed
                res.status(400).json({
                    error: "Multer error",
                    message: "Unexpected error during file upload.",
                });
            }
        }
    };

    private handleCriticalError(
        error: Error | CustomError,
        response?: Response
    ): void {
        if (response) {
            console.trace(error);
            response
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal server error" });
        }

        console.log("Application encountered a critical error");
        // process.exit(1);
    }

    public handleError(error: Error | CustomError, response?: Response): void {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as CustomError, response);
        } else if (error instanceof multer.MulterError) {
            this.handleMulterError(error, response);
        } else {
            this.handleCriticalError(error, response);
        }
    }
}
