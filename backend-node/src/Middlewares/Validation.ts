import { ZodError, z } from "zod"
import HttpStatusCode from "../utils/HttpStatusCode";
import { NextFunction, Request, Response } from "express";

const extractError = (error: ZodError, res: Response): Response => {
    const errorMessages = error.errors.map((err) => {
        return {
            path: err.path.join('.'),
            message: err.message === 'Required' ? `The field ${err.path.join('.')} is required.` : err.message,
        };
    });
    return res.status(HttpStatusCode.FORBIDDEN).json({
        message: 'Validation failed',
        errors: errorMessages,
    });
}

export default class Validation {

    static UserLoginValidator(req: Request, res: Response, next: NextFunction) {

        const userSchema = z.object({
            email: z.string().email().nullable(),
            password: z.string().min(6),
        });

        try {
            const user = req.body;
            userSchema.parse(user);
            return next();
        } catch (error) {

            if (error instanceof ZodError) return extractError(error, res);

            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: 'Internal Server Error!',
            });
        }
    }

}