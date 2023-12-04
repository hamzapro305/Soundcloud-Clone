import express, { Request, Response, Application } from 'express';
import testRouter from './src/routes/testRouter';
import { ConnectToDB } from './src/config/ConnectToDB';
import { BACKEND_PORT } from './src/config';

const app: Application = express();

// Routers
app.use("/api/test", testRouter)

ConnectToDB(() => {
    app.listen(BACKEND_PORT, () => {
        console.log(`Application started at ${BACKEND_PORT}`);
    });
})