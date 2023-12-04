import express, { Request, Response, Application } from 'express';
import { BACKEND_PORT, DB_HOST, DB_PORT } from './src/config';
import testRouter from './src/routes/testRouter';

const app: Application = express();
const port = BACKEND_PORT || 3001;

app.use("/api/test", testRouter)

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});