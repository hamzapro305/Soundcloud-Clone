import { NextFunction, Request, Response } from "express";
import passport from "passport";
import HttpStatusCode from "../utils/HttpStatusCode";
import JWT_Utils from "../utils/JWT_Utils";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class AuthMiddleware {

    public authenticateLocal(req: Request, res: Response, next: NextFunction) {
        const _JWT_UTILS = new JWT_Utils();
        passport.authenticate('local', (err: any, user: any, info: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                // Handle authentication failure (e.g., redirect to login page)
                return res.status(HttpStatusCode.BAD_REQUEST).json("some error")
            }
            return res.status(HttpStatusCode.OK).json({
                token: _JWT_UTILS.generateToken(user)
            })
        })(req, res, next);
    }
    public isLoggedIn(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>> {
        const authorizationHeader = req.headers['authorization'];
        const _JWT_UTILS = new JWT_Utils();

        if (!authorizationHeader) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                message: 'User not Authenticated',
            });
        }

        const token = authorizationHeader.replace('Bearer ', '');

        if (!token) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                message: 'Token not provided',
            });
        }

        try {
            const decodedToken = _JWT_UTILS.verifyToken(token);
            if (!decodedToken) {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    message: 'Invalid token',
                });
            }
            // Optional: Attach the decoded token to the request for further processing
            req.user = decodedToken;

            // Continue to the next middleware or route handler
            next();
        } catch (error) {
            next(error)
        }
    }

}
