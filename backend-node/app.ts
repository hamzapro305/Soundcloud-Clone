import express, { Request, Response, Application } from 'express';
import testRouter from './src/routes/testRouter';
import user_router from './src/routes/UserRoutes';
import { ConnectToDB } from './src/config/ConnectToDB';
import { BACKEND_PORT } from './src/config';

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Routers
app.use(express.json())
app.use("/api/test", testRouter)

app.use("/api/user", user_router)



app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});