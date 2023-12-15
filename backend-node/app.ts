import ErrorMiddleware from './src/routes/ErrorRouter';
import TestRouter from './src/routes/TestRouter';
import UserRouter from './src/routes/UserRouter';
import FollowRouter from './src/routes/FollowRouter';
import dotenv from 'dotenv';
import { BACKEND_PORT } from './src/config';
import Middlewares from './src/Middlewares/Middlewares';
import passport from 'passport';
import { PassportConfig } from './src/passport/PassportConfig';


dotenv.config();
const PORT = BACKEND_PORT || 8000;

// Middlewares
const app = Middlewares()

// Passport Config
new PassportConfig(app, passport)

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