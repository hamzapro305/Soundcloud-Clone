import { NextFunction, Request, Response } from "express";
import passport from "passport";
import HttpStatusCode from "../utils/HttpStatusCode";

export class AuthMiddleware {
    public authenticateLocal() {
        return passport.authenticate('local', {
            failureFlash: true
        })
    }
    public isLoggedIn(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>> {
        return req.user ? next() : res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "User not Authenticated"
        })
    }
}
