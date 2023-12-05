import express, { Application } from 'express';
import testRouter from './src/routes/testRouter';
import user_router from './src/routes/UserRoutes';
import follow_router from './src/routes/FollowRoutes';
import ErrorMiddleware from './src/routes/ErrorRouter';

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json())

// Routers
app.use("/api/test", testRouter)
app.use("/api/user", user_router)
app.use("/api/follow-user", follow_router)

app.use(ErrorMiddleware)

// Run application
app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});