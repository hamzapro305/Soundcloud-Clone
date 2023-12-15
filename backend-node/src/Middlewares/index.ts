import express, { Application } from 'express';
import cors from "cors";
import compression from 'compression';
import session from 'express-session';
import passport from 'passport';


const Middlewares = () => {
    const app: Application = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({}));
    app.use(compression({
        level: -1,
        memLevel: 9,
        threshold: 0,
        filter: () => {
            return true
        }
    }));
    app.use(session({
        secret: 'your-secret-key',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    return app;
}

export default Middlewares