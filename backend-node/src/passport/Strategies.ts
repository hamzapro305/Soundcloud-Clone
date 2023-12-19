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
import { inject, injectable } from "tsyringe";
import { Request } from "express";

@injectable()
export default class Strategies {
    constructor(
        @inject(UserRepository)
        private readonly _userRepository: UserRepository
    ) {
        this.localStrategy();
        this.googleStrategy();
    }

    private localStrategy() {
        passport.use(
            new LocalStrategy(
                {
                    usernameField: "email",
                },
                async (email, password, done) => {
                    const userRepository = new UserRepository();
                    try {
                        const user = await userRepository.getByEmail(email);
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
    }
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
                        console.log(
                            "Check if a user with the provided Google ID exists"
                        );
                        // Check if a user with the provided Google ID exists
                        const existingUser =
                            await this._userRepository.getByGoogleId(
                                profile.id
                            );

                        if (existingUser) {
                            // User with Google ID already exists
                            return done(null, existingUser);
                        }
                        console.log("failed");
                        const email = profile.emails
                            ? profile.emails[0].value
                            : "";
                        console.log(
                            "Check if a user with the provided email exists"
                        );
                        // Check if a user with the provided email exists
                        const userWithEmail = await this._userRepository.getByEmail(email);

                        if (userWithEmail) {
                            // User with the provided email exists, link Google ID to the existing user
                            userWithEmail.google_id = profile.id;

                            // Update the user in the database
                            const googleData =
                                await this._userRepository.createGoogleForUser(
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
                        console.log("failed");

                        console.log(
                            "User does not exist, create a new user with Google ID"
                        );
                        // User does not exist, create a new user with Google ID

                        // Create the new user in the database
                        const createdUser =
                            await this._userRepository.createByGoogle(email, {
                                access_token: accessToken,
                                google_id: profile?.id,
                                refresh_token: refreshToken ?? "",
                            });
                        console.log("failed");

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
                    clientID: "YOUR_FACEBOOK_APP_ID",
                    clientSecret: "YOUR_FACEBOOK_APP_SECRET",
                    callbackURL: "http://localhost:3000/auth/facebook/callback", // Adjust the callback URL
                },
                (accessToken, refreshToken, profile, done) => {
                    // Implement your Facebook authentication logic here
                    // Example: Find or create a user based on the Facebook profile information
                    const user = {
                        id: 3,
                        username: "facebookUser",
                        email: profile.emails ? profile.emails[0].value : "",
                    };
                    return done(null, user);
                }
            )
        );
    };
}
