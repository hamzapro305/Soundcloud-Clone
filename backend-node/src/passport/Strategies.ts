import { Strategy as LocalStrategy } from "passport-local";
import {
    Strategy as GoogleStrategy,
    VerifyCallback,
} from "passport-google-oauth2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import UserRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";
import passport from "passport";
import { inject, singleton } from "tsyringe";
import { Request } from "express";
import GoogleRepository from "../repository/GoogleRepository";
import FacebookRepository from "../repository/FacebookRepository";

@singleton()
export default class Strategies {
    constructor(
        @inject(UserRepository)
        private readonly _userRepository: UserRepository,

        @inject(GoogleRepository)
        private readonly _googleRepository: GoogleRepository,

        @inject(FacebookRepository)
        private readonly _facebookRepository: FacebookRepository
    ) {
        this.localStrategy();
        this.googleStrategy();
        this.facebookStrategy();
    }

    private localStrategy = () => {
        passport.use(
            new LocalStrategy(
                {
                    usernameField: "email",
                },
                async (email, password, done) => {
                    try {
                        const user = await this._userRepository.getByEmail(
                            email
                        );
                        if (!user) {
                            return done(
                                new CustomError(
                                    "User Not Found",
                                    HttpStatusCode.NOT_FOUND
                                ),
                                false
                            );
                        }
                        if (user?.password === password) {
                            return done(null, user);
                        } else {
                            return done(
                                new CustomError(
                                    "Password incorrect",
                                    HttpStatusCode.BAD_REQUEST
                                ),
                                false
                            );
                        }
                    } catch (error) {
                        return done(error, false);
                    }
                }
            )
        );
    };
    private googleStrategy = () => {
        passport.use(
            new GoogleStrategy(
                {
                    clientID:
                        "435572794537-flep8daaqbigtc8a2u2koru2hbhffknd.apps.googleusercontent.com",
                    clientSecret: "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",
                    callbackURL:
                        "http://localhost:8000/api/auth/login/google/callback",
                    passReqToCallback: true,
                },
                async (
                    request: Request,
                    accessToken: string,
                    refreshToken: string,
                    profile: any,
                    done: VerifyCallback
                ) => {
                    try {
                        // Check if a user with the provided Google ID exists
                        const existingUser =
                            await this._userRepository.getByGoogleId(
                                profile.id
                            );

                        if (existingUser) {
                            // User with Google ID already exists
                            return done(null, existingUser);
                        }

                        const email = profile.emails
                            ? profile.emails[0].value
                            : "";

                        // Check if a user with the provided email exists
                        const userWithEmail =
                            await this._userRepository.getByEmail(email);

                        if (userWithEmail) {
                            // User with the provided email exists, link Google ID to the existing user
                            userWithEmail.google_id = profile.id;

                            // Update the user in the database
                            await this._googleRepository.createGoogleForUser(
                                userWithEmail.uid,
                                {
                                    google_id: profile?.id,
                                    access_token: accessToken,
                                    refresh_token: refreshToken ?? "",
                                }
                            );
                            const updatedUser =
                                await this._userRepository.getByGoogleId(
                                    profile.id
                                );
                            return done(null, updatedUser);
                        }

                        // User does not exist, create a new user with Google ID

                        // Create the new user in the database
                        const createdUser =
                            await this._userRepository.createByGoogle(email, {
                                access_token: accessToken,
                                google_id: profile?.id,
                                refresh_token: refreshToken ?? "",
                            });

                        return done(null, createdUser);
                    } catch (error) {
                        console.error(error); // Log the error for debugging
                        return done(
                            new CustomError(
                                "Google Authentication Failed",
                                HttpStatusCode.INTERNAL_SERVER_ERROR
                            ),
                            false
                        );
                    }
                }
            )
        );
    };
    private facebookStrategy = () => {
        passport.use(
            new FacebookStrategy(
                {
                    clientID: "1212556792792833",
                    clientSecret: "f346ef9d3e3bc9fa132904c21a640d7a",
                    callbackURL: "http://localhost:8000/api/auth/login/facebook/callback", // Adjust the callback URL
                    profileFields: ["id", "email", "name"],
                    passReqToCallback: true,
                    scope: ["email"],
                },
                async (
                    request: Request,
                    accessToken: string,
                    refreshToken: string,
                    profile: any,
                    done: VerifyCallback
                ) => {
                    try {
                        // Check if a user with the provided Facebook ID exists
                        const existingUser =
                            await this._userRepository.getByFacebookId(
                                profile.id
                            );

                        if (existingUser) {
                            // User with Facebook ID already exists
                            return done(null, existingUser);
                        }

                        const email = profile.emails
                            ? profile.emails[0].value
                            : "";

                        // Check if a user with the provided email exists
                        const userWithEmail =
                            await this._userRepository.getByEmail(email);

                        if (userWithEmail) {
                            // User with the provided email exists, link Facebook ID to the existing user
                            userWithEmail.facebook_id = profile.id;

                            // Update the user in the database
                            await this._facebookRepository.createFacebookForUser(
                                userWithEmail.uid,
                                {
                                    facebook_id: profile?.id,
                                    access_token: accessToken,
                                    refresh_token: refreshToken ?? "",
                                }
                            );
                            const updatedUser =
                                await this._userRepository.getByFacebookId(
                                    profile.id
                                );
                            return done(null, updatedUser);
                        }

                        // User does not exist, create a new user with Facebook ID

                        // Create the new user in the database
                        const createdUser =
                            await this._userRepository.createByFacebook(email, {
                                access_token: accessToken,
                                facebook_id: profile?.id,
                                refresh_token: refreshToken ?? "",
                            });

                        return done(null, createdUser);
                    } catch (error) {
                        console.error(error); // Log the error for debugging
                        return done(
                            new CustomError(
                                "Facebook Authentication Failed",
                                HttpStatusCode.INTERNAL_SERVER_ERROR
                            ),
                            false
                        );
                    }
                }
            )
        );
    };
}
