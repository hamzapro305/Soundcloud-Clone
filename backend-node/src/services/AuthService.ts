import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; // Assuming you have a User model and IUser interface
import UserServices from './UserServices';

class AuthService {
    constructor() {
        // Initialize passport
        passport.initialize();

        // Configure the session
        passport.session();

        this.configureLocalStrategy();
        this.configureGoogleStrategy();
        this.serializeUser();
        this.deserializeUser();
    }

    private configureLocalStrategy() {
        passport.use(
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                },
                async (username, password, done) => {
                    try {
                        const user = await UserServices.getUserByEmail(username)

                        if (!user || !(await user.verifyPassword(password))) {
                            return done(null, false, { message: 'Invalid username or password' });
                        }

                        return done(null, user);
                    } catch (error) {
                        return done(error);
                    }
                }
            )
        );
    }

    private configureGoogleStrategy() {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: 'your_client_id',
                    clientSecret: 'your_client_secret',
                    callbackURL: 'your_callback_url',
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        // Check if the user already exists in your database
                        let user = await User.findOne({ googleId: profile.id });

                        if (!user) {
                            // Create a new user if not found
                            user = new User({
                                googleId: profile.id,
                                email: profile.emails[0].value,
                                name: profile.displayName,
                            });
                            await user.save();
                        }

                        return done(null, user);
                    } catch (error) {
                        return done(error);
                    }
                }
            )
        );
    }

    private serializeUser() {
        passport.serializeUser<any, any>((user, done) => {
            done(null, user.id);
        });
    }

    private deserializeUser() {
        passport.deserializeUser(async (id: string, done) => {
            try {
                const user = await User.findById(id);
                done(null, user);
            } catch (error) {
                done(error);
            }
        });
    }

    // Other methods related to authentication if needed
}

export default AuthService;

let user = {
    id: "",
    email: "",
    password: "",
    googleId: "", // Providees
    facebookId: "" // Providees
}