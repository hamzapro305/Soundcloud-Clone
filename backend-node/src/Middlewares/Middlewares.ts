import express, { Application } from 'express';
import cors from "cors";
import compression from 'compression';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';


const Middlewares = () => {
    const app: Application = express();

    app.set('views', path.join(__dirname, '../assets'))
    app.set('view engine', 'ejs');

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
        // this should be changed to something cryptographically secure for production
        secret: 'Secret_key',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(cookieParser());
    return app;
}

export default Middlewares