import { PassportStatic } from "passport";
import { Strategies } from "./Strategies";
import { Application } from "express";
import UserRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import JWT_Utils from "../utils/JWT_Utils";
import { JwtPayload } from "jsonwebtoken";

export class PassportConfig {
    private _passport: PassportStatic;
    private _userRepository: UserRepository;
    private _Jwt: JWT_Utils;
    constructor(app: Application, passport: PassportStatic, _userRepository: UserRepository, _Jwt: JWT_Utils) {
        this._passport = passport;
        this._userRepository = _userRepository;
        this._Jwt = _Jwt


        // Initialize Passport and configure strategies
        app.use(this._passport.initialize());
        app.use(this._passport.session());

        // Setup Passport strategies
        new Strategies(this._passport);

        // Serialize and deserialize user
        this.serializeUser();
        this.deserializeUser();
    }

    private serializeUser() {
        this._passport.serializeUser((user: any, done) => {
            done(null, this._Jwt.generateToken(user));
        });
    }
    private deserializeUser() {
        const repo = this._userRepository;
        this._passport.deserializeUser(async (token, done) => {
            try {
                const user_payload = this._Jwt.verifyToken(token as string) as JwtPayload
                const user = await repo.getByUID(user_payload?.uid as string);
                if (!user) {
                    return done(new CustomError("User Not Found", HttpStatusCode.NOT_FOUND), { message: "User Not Found" })
                }
                // const { password, ...data } = user
                return done(null, "user")
            } catch (error) {
                return done(error, false)
            }
        });
    }
}