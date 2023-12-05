import express, { Application } from 'express';
import testRouter from './src/routes/testRouter';
import user_router from './src/routes/UserRoutes';

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json())

// Routers
app.use("/api/test", testRouter)
app.use("/api/user", user_router)

// Run application
app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});