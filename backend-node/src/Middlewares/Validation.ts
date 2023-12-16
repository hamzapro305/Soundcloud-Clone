import { ZodError, z } from "zod"
import HttpStatusCode from "../utils/HttpStatusCode";
import { NextFunction, Request, Response } from "express";

export default class Validation {

    static UserLoginValidator(req: Request, res: Response, next: NextFunction) {
        // Define a schema for user information
        const userSchema = z.object({
            email: z.string().email().nullable(),
            password: z.string().min(6),
        });
        try {
            const user = req.body;
            // Validate the user object against the schema
            userSchema.parse(user);
            return next()
        } catch (error) {
            // Handle validation errors (ZodError)
            if (error instanceof ZodError) {
                return res.status(HttpStatusCode.FORBIDDEN).json({
                    message: error.message
                })
            }
            // Throw other unexpected errors
            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: "Internal Server Error!"
            })
        }
    }

}