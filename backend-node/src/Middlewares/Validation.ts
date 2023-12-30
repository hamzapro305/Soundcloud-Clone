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
    private schemaHandler = (
        schema: any,
        data: any,
        res: Response,
        next: NextFunction
    ) => {
        try {
            schema.parse(data);
            return next();
        } catch (error) {
            if (error instanceof ZodError) return extractZodError(error, res);
            return res.status(HttpStatusCode.FORBIDDEN).json({
                message: "Internal Server Error!",
            });
        }
    };
    public UpdateProfileByUIDValidator = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const profileSchema = z.object({
            full_name: z.string(),
            bio: z.string(),
        });
        const { data: profile } = req.body;
        this.schemaHandler(profileSchema, profile, res, next);
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
        const user = req.body?.user;
        this.schemaHandler(userSchema, user, res, next);
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
        const song = req.body?.song;
        this.schemaHandler(songSchema, song, res, next);
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
        const song = req.body?.song;
        this.schemaHandler(songSchema, song, res, next);
    };
}
