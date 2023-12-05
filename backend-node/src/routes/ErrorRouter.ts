import { NextFunction, Request, Response, Router } from 'express';
import { ErrorHandler } from '../exceptions/ErrorHandler';

const errorRouter = Router()

errorRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // 3. Lastly, handle the error
    (new ErrorHandler()).handleError(err, res);
});

export default errorRouter