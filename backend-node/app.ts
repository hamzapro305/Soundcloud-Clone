import "reflect-metadata";
import dotenv from 'dotenv';
import passport from 'passport';
import ErrorMiddleware from './src/routes/ErrorRouter';
import UserRouter from './src/routes/UserRouter';
import FollowRouter from './src/routes/FollowRouter';
import { BACKEND_PORT } from './src/config';
import Middlewares from './src/Middlewares/Middlewares';
import { PassportConfig } from './src/passport/PassportConfig';
import UserRepository from "./src/repository/UserRepository";
import JWT_Utils from "./src/utils/JWT_Utils";
import TestRouter from "./src/routes/testRouter";


dotenv.config();
const PORT = BACKEND_PORT || 8000;

// Middlewares
const app = Middlewares()

// Passport Config
new PassportConfig(app, passport, new UserRepository(), new JWT_Utils())

// Routers
app.use("/api/test", TestRouter)
app.use("/api/user", UserRouter)
app.use("/api/follow-user", FollowRouter)

// Handle Error After Controller
app.use(ErrorMiddleware)

// Run application
app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});