import express, { Application } from 'express';
import ErrorMiddleware from './src/routes/ErrorRouter';
import cors from "cors"
import TestRouter from './src/routes/TestRouter';
import UserRouter from './src/routes/UserRouter';
import FollowRouter from './src/routes/FollowRouter';
import dotenv from 'dotenv';
import { BACKEND_PORT } from './src/config';

dotenv.config();
const app: Application = express();
const PORT = BACKEND_PORT || 8000;

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({}));

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