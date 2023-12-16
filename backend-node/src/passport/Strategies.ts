import { PassportStatic } from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import UserRepository from "../repository/UserRepository";
import { CustomError } from "../exceptions/CustomError";
import HttpStatusCode from "../utils/HttpStatusCode";


export class Strategies {
	constructor(passport: PassportStatic) {
		this.localStrategy(passport);
		// this.googleStrategy(passport);
		// this.facebookStrategy(passport);
	}
	private localStrategy(passport: PassportStatic) {
		passport.use(
			new LocalStrategy(
				{
					usernameField: "email",
				},
				async (email, password, done) => {
					const userRepository = new UserRepository()
					try {
						const user = await userRepository.getByEmail(email);
						if (!user) {
							return done(
								new CustomError("User Not Found", HttpStatusCode.NOT_FOUND),
								false
							);
						}
						if (user?.password === password) {
							return done(null, user);
						} else {
							return done(
								new CustomError("Password incorrect", HttpStatusCode.BAD_REQUEST),
								false
							);
						}
					} catch (error) {
						return done(error, false);
					}
				})
		);

	}
	private googleStrategy(passport: PassportStatic) {
		passport.use(
			new GoogleStrategy(
				{
					clientID: 'YOUR_GOOGLE_CLIENT_ID',
					clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
					callbackURL: 'http://localhost:3000/auth/google/callback', // Adjust the callback URL
				},
				async (accessToken, refreshToken, profile, done) => {
					try {
						const userRepository = new UserRepository();

						// Check if a user with the provided Google ID exists
						const existingUser = await userRepository.getByGoogleId(profile.id);

						if (existingUser) {
							// User with Google ID already exists
							return done(null, existingUser);
						}

						// Check if a user with the provided email exists
						const userWithEmail = await userRepository.getByEmail(profile.emails ? profile.emails[0].value : '');

						if (userWithEmail) {
							// User with the provided email exists, link Google ID to the existing user
							userWithEmail.google_id = profile.id;

							// Update the user in the database
							const updatedUser = await userRepository.updateByUID(userWithEmail.uid, userWithEmail);
							return done(null, updatedUser);
						}

						// User does not exist, create a new user with Google ID
						const newUser = {
							email: profile.emails ? profile.emails[0].value : '',
							google_id: profile.id,
							password: '',
						};

						// Create the new user in the database
						const createdUser = await userRepository.createByGoogle(newUser);
						return done(null, createdUser);
					} catch (error) {
						return done(new CustomError("Google Authentication Failed", HttpStatusCode.INTERNAL_SERVER_ERROR), false);
					}
				}
			)
		);
	}

	private facebookStrategy(passport: PassportStatic) {
		passport.use(
			new FacebookStrategy(
				{
					clientID: 'YOUR_FACEBOOK_APP_ID',
					clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
					callbackURL: 'http://localhost:3000/auth/facebook/callback', // Adjust the callback URL
				},
				(accessToken, refreshToken, profile, done) => {
					// Implement your Facebook authentication logic here
					// Example: Find or create a user based on the Facebook profile information
					const user = { id: 3, username: 'facebookUser', email: profile.emails ? profile.emails[0].value : '' };
					return done(null, user);
				}
			)
		);

	}
}