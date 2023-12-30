import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "./HttpStatusCode";
import { autoInjectable } from "tsyringe";
import { Request } from "express";

@autoInjectable()
export default class JWT_Utils {
    private Private_Key: jwt.Secret = "Something Just Like This";

    public generateToken = (data: any) => {
        return jwt.sign(data, this.Private_Key, {
            algorithm: "HS256",
            expiresIn: "10d",
        });
    };

    public getUserFromRequest = (req: Request) => {
        return this.verifyToken(this.extractToken(req));
    };

    public extractToken = (req: Request): string => {
        const authorizationHeader = req.headers["authorization"];

        if (!authorizationHeader) {
            throw new CustomError(
                "User not Authenticated",
                HttpStatusCode.UNAUTHORIZED
            );
        }
        const token = authorizationHeader.replace("Bearer ", "");
        if (!token) {
            throw new CustomError(
                "Token not provided",
                HttpStatusCode.UNAUTHORIZED
            );
        }
        return token;
    };

    public verifyToken = (token: string): JwtPayload => {
        try {
            return jwt.verify(token, this.Private_Key) as JwtPayload;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new CustomError(
                    "Token is expired",
                    HttpStatusCode.UNAUTHORIZED
                );
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new CustomError(
                    "Invalid token",
                    HttpStatusCode.UNAUTHORIZED
                );
            } else if (error instanceof jwt.NotBeforeError) {
                throw new CustomError(
                    "Token not yet active",
                    HttpStatusCode.UNAUTHORIZED
                );
            } else {
                // Handle other unexpected errors
                throw new CustomError(
                    "Token verification error",
                    HttpStatusCode.INTERNAL_SERVER_ERROR
                );
            }
        }
    };
}
