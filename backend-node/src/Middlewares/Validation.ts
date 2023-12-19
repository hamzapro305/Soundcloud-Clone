import { ZodError, z } from "zod";
import HttpStatusCode from "../utils/HttpStatusCode";
import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";

const extractZodError = (error: ZodError, res: Response): Response => {
    const errorMessages = error.errors.map((err) => {
        return {
            path: err.path.join("."),
            message:
                err.message === "Required"
                    ? `The field ${err.path.join(".")} is required.`
                    : err.message,
        };
    });
    return res.status(HttpStatusCode.FORBIDDEN).json({
        message: "Validation failed",
        errors: errorMessages,
    });
};

@injectable()
export default class Validation {
    public UserLoginValidator = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userSchema = z.object({
            email: z.string().email().nullable(),
            password: z.string().min(6),
        });

        try {
            const user = req.body;
            userSchema.parse(user);
            return next();
        } catch (error) {
            if (error instanceof ZodError) return extractZodError(error, res);

            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: "Internal Server Error!",
            });
        }
    };
}
