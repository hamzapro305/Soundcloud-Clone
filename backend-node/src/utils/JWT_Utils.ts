import jwt from "jsonwebtoken"
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "./HttpStatusCode";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export default class JWT_Utils {
    private Private_Key: jwt.Secret = "Somethjouiahdusyagf;iuashdfuyasgf8yashgdcisaghdif"

    public generateToken(data: any) {
        return jwt.sign(
            data, this.Private_Key, { algorithm: 'HS256', expiresIn: "1h" }
        );
    }

    public verifyToken(token: string) {
        try {
            return jwt.verify(token, this.Private_Key);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new CustomError('Token is expired', HttpStatusCode.UNAUTHORIZED);
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new CustomError('Invalid token', HttpStatusCode.UNAUTHORIZED);
            } else if (error instanceof jwt.NotBeforeError) {
                throw new CustomError('Token not yet active', HttpStatusCode.UNAUTHORIZED);
            } else {
                // Handle other unexpected errors
                throw new CustomError('Token verification error', HttpStatusCode.INTERNAL_SERVER_ERROR);
            }
        }
    }
}