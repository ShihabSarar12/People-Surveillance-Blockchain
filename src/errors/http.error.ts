class HttpError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpError';
        Error.captureStackTrace?.(this, HttpError);
    }
}

export default HttpError;
