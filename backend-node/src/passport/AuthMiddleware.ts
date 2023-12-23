import { NextFunction, Request, Response } from "express";
import passport from "passport";
import HttpStatusCode from "../utils/HttpStatusCode";
import JWT_Utils from "../utils/JWT_Utils";
import { inject, injectable } from "tsyringe";

@injectable()
export default class AuthMiddleware {
    constructor(
        @inject(JWT_Utils)
        private readonly _JWT_UTILS: JWT_Utils
    ) {}

    public authenticateLocal = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const _JWT_UTILS = new JWT_Utils();
        passport.authenticate("local", (err: any, user: any, info: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                // Handle authentication failure (e.g., redirect to login page)
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json("some error");
            }
            return res.status(HttpStatusCode.OK).json({
                token: _JWT_UTILS.generateToken(user),
            });
        })(req, res, next);
    };
    public authenticateGoogle = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        passport.authenticate("google", (err: any, user: any, info: any) => {
            console.log(err);
            if (err) {
                return next(err);
            }
            if (!user) {
                // Handle authentication failure (e.g., redirect to login page)
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json("some error");
            }
            console.log("google => ", user);
            return res.status(HttpStatusCode.OK).json({
                token: this._JWT_UTILS.generateToken(user),
            });
        })(req, res, next);
    };
    public googleCallback = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        passport.authenticate("google", (err: any, user: any, info: any) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                // Handle authentication failure (e.g., redirect to login page)
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .json("some error");
            }
            const token = this._JWT_UTILS.generateToken(user);
            res.render("GoogleLoginSuccess.ejs", {
                token: token,
            });
        })(req, res, next);
    };
    public isLoggedIn = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void | Response<any, Record<string, any>> => {
        try {
            const token = this._JWT_UTILS.extractToken(req);
            const decodedToken = this._JWT_UTILS.verifyToken(token);
            if (!decodedToken) {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    message: "Invalid token",
                });
            }
            // Optional: Attach the decoded token to the request for further processing
            req.user = decodedToken;

            // Continue to the next middleware or route handler
            next();
        } catch (error) {
            next(error);
        }
    };
}
