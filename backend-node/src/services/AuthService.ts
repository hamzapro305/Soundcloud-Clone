import { inject, singleton } from "tsyringe";
import JWT_Utils from "../utils/JWT_Utils";
import { Request } from "express";
import GoogleService from "./GoogleService";

@singleton()
class AuthService {
    constructor(
        @inject(JWT_Utils)
        private readonly _JWT_UTILS: JWT_Utils,

        @inject(GoogleService)
        private readonly _googleService: GoogleService
    ) {}
    public readonly getUpdatedUserIfLoggedIn = (req: Request): boolean => {
        try {
            const token = this._JWT_UTILS.extractToken(req);
            const decodedToken = this._JWT_UTILS.verifyToken(token);
            if (!decodedToken) return false;
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    public readonly isGoogleConnected = (_uid: string) => {
        try {
            // const googleAcc = this._googleService.getGoogleAccount()
        } catch (error) {
            
        }
    };
    public readonly isFacebookConnected = (_uid: string) => {};
}

export default AuthService;
