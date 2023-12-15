import { NextFunction, Request, Response } from "express";
import passport from "passport";

export class AuthMiddleware {
    public authenticateLocal() {
        return passport.authenticate('local', {
            failureFlash: true
        })
    }
}
