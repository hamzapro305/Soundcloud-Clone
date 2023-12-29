import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import session from "express-session";
import cookieParser from "cookie-parser";
import monitor from "express-status-monitor"

const Middlewares = () => {
    const app: Application = express();

    // Status Monitor
    const Monitor = monitor({
        path: "/status"
    })
    app.use(Monitor);


    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({}));
    app.use(
        compression({
            level: -1,
            memLevel: 9,
            threshold: 0,
            filter: () => {
                return true;
            },
        })
    );
    app.use(
        session({
            // this should be changed to something cryptographically secure for production
            secret: "Secret_key",
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(cookieParser());
    return app;
};

export default Middlewares;
