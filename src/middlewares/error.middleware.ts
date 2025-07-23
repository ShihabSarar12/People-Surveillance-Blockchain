import { Request, Response, NextFunction } from 'express';

class ErrorMiddleware {
    constructor() {}

    public errorHandler(
        err: Error,
        _: Request,
        res: Response,
        __: NextFunction
    ): Response {
        console.error(err.stack);
        return res.status(500).json({
            message: 'An unexpected error occurred.',
            ...(process.env.NODE_ENV === 'development' && {
                error: err.message || 'Internal Server Error',
            }),
        });
    }

    public notFound(_: Request, res: Response): Response {
        return res.status(404).json({
            message: 'Resource not found.',
        });
    }
}

export default new ErrorMiddleware();
