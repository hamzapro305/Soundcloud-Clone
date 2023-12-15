import ErrorMiddleware from './src/routes/ErrorRouter';
import TestRouter from './src/routes/TestRouter';
import UserRouter from './src/routes/UserRouter';
import FollowRouter from './src/routes/FollowRouter';
import dotenv from 'dotenv';
import { BACKEND_PORT } from './src/config';
import Middlewares from './src/Middlewares';

dotenv.config();
const PORT = BACKEND_PORT || 8000;

// Middlewares
const app = Middlewares()

app.get("/check", (req, res) => {
    res.status(200).send("Hamza Siddiqui".repeat(100000))
})

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