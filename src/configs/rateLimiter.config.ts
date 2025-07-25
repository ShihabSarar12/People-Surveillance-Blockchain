import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
});

export default limiter;
