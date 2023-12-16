import { PassportStatic } from "passport";
import { Strategies } from "./Strategies";
import { Application } from "express";
import UserRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";

export class PassportConfig {
    private _passport: PassportStatic;
    private _userRepository: UserRepository;
    constructor(app: Application, passport: PassportStatic) {
        this._passport = passport;
        this._userRepository = new UserRepository();


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
            const { uid } = user
            done(null, uid);
        });
    }
    private deserializeUser() {
        const repo = this._userRepository;
        this._passport.deserializeUser(async (userId, done) => {
            try {
                const user = await repo.getByUID(userId as string);
                if (!user) {
                    return done(new CustomError("User Not Found", HttpStatusCode.NOT_FOUND), { message: "User Not Found" })
                }
                // const { password, ...data } = user
                return done(null, user)
            } catch (error) {
                return done(error, false)
            }
        });
    }
}