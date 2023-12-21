import "reflect-metadata";

import dotenv from "dotenv";
import ErrorMiddleware from "./src/routes/ErrorRouter";
import UserRouter from "./src/routes/UserRouter";
import FollowRouter from "./src/routes/FollowRouter";
import { BACKEND_PORT } from "./src/config";
import Middlewares from "./src/Middlewares/Middlewares";
import { PassportConfig } from "./src/passport/PassportConfig";
import TestRouter from "./src/routes/testRouter";
import AuthRouter from "./src/routes/AuthRouter"

dotenv.config();
const PORT = BACKEND_PORT || 8000;

// Middlewares
const app = Middlewares();

// Passport Config
new PassportConfig(app);

// Routers
app.use("/api/test", TestRouter);
app.use("/api/user", UserRouter);
app.use("/api/follow-user", FollowRouter);
app.use("/api/auth", AuthRouter);

// Handle Error After Controller
app.use(ErrorMiddleware);

// Run application
app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});
