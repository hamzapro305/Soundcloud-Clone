import express, { Application } from 'express';
import UserRouter from './src/routes/FollowRouter';
import ErrorMiddleware from './src/routes/ErrorRouter';
import cors from "cors"
import TestRouter from './src/routes/testRouter';
import FollowRouter from './src/routes/FollowRouter';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json())
app.use(cors());

// Routers
app.use("/api/test", TestRouter)
app.use("/api/user", UserRouter)
app.use("/api/follow-user", FollowRouter)

app.use(ErrorMiddleware)

// Run application
app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});