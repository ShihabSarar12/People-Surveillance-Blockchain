import { Request, Response, NextFunction } from 'express';
import logger from '../utilities/logger.utility';
import HTTP_STATUS from '../constants/status.constant';

class ErrorMiddleware {
    constructor() {}

    public errorHandler = (
        err: Error,
        _: Request,
        res: Response,
        __: NextFunction
    ): Response => {
        logger.error(err.stack);
        logger.error('An error occurred. ', err.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: 'An unexpected error occurred.',
            ...(process.env.NODE_ENV !== 'production' && {
                error: err.message || 'Internal server error',
            }),
        });
    };

    public notFound = (_: Request, res: Response): Response => {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            message: 'Resource not found.',
        });
    };
}

export default new ErrorMiddleware();
