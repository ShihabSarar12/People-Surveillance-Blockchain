import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error.middleware';
import blockchainRouter from './routers/blockchain.router';
import limiter from './configs/rateLimiter.config';
dotenv.config();

const app: Application = express();

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/blockchain', blockchainRouter);

app.get('/', (req: Request, res: Response): Response => {
    return res.send('Hello, TypeScript with Express!');
});
app.use(errorMiddleware.errorHandler);
app.use(errorMiddleware.notFound);

export default app;
