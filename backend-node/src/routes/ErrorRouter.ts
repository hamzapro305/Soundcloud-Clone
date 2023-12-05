import { NextFunction, Request, Response, Router } from 'express';
import { ErrorHandler } from '../exceptions/ErrorHandler';


const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // 3. Lastly, handle the error
    const errorHandler = new ErrorHandler()
    errorHandler.handleError(err, res);
}

export default ErrorMiddleware