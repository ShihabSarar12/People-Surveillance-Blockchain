import { Request, Response, NextFunction } from 'express';
import logger from '../utilities/logger.utility';
import HttpStatus from '../constants/status.constant';
import { NODE_ENV } from '../constants/env.constants';

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
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'An unexpected error occurred.',
            ...(NODE_ENV !== 'production' && {
                error: err.message || 'Internal server error',
            }),
        });
    };

    public notFound = (_: Request, res: Response): Response => {
        return res.status(HttpStatus.NOT_FOUND).json({
            message: 'Resource not found.',
        });
    };
}

export default new ErrorMiddleware();
