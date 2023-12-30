import { ZodError, z } from "zod";
import HttpStatusCode from "../utils/HttpStatusCode";
import { NextFunction, Request, Response } from "express";
import { singleton } from "tsyringe";

const extractZodError = (error: ZodError, res: Response): Response => {
    const errorMessages = error.errors.map((err) => {
        return {
            field: err.path.join("."),
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

@singleton()
export default class Validation {
    public UpdateProfileByUIDValidator = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const profileSchema = z.object({
            full_name: z.string(),
            bio: z.string(),
        });
        try {
            const { data: profile } = req.body;
            profileSchema.parse(profile);
            return next();
        } catch (error) {
            if (error instanceof ZodError) return extractZodError(error, res);
            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: "Internal Server Error!",
            });
        }
    };
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
            const user = req.body?.user;
            userSchema.parse(user);
            return next();
        } catch (error) {
            if (error instanceof ZodError) return extractZodError(error, res);

            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: "Internal Server Error!",
            });
        }
    };
    public readonly createSongValidator = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const songSchema = z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            url: z.string(),
        });
        try {
            const song = req.body?.song;
            songSchema.parse(song);
            return next();
        } catch (error) {
            if (error instanceof ZodError) return extractZodError(error, res);

            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: "Internal Server Error!",
            });
        }
    };
    public readonly updateSongValidator = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const songSchema = z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            thumbnail: z.string().optional(),
            genre: z.string().optional(),
            duration: z.number().optional(),
            privacy: z.enum(["PRIVATE", "PUBLIC"]).optional(),
        });
        try {
            const song = req.body?.song;
            songSchema.parse(song);
            return next();
        } catch (error) {
            if (error instanceof ZodError) return extractZodError(error, res);

            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: "Internal Server Error!",
            });
        }
    };
}
