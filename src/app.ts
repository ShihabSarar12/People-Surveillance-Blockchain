import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import errorMiddleware from './middlewares/error.middleware';
import blockchainRouter from './routers/blockchain.router';
import limiter from './configs/rateLimiter.config';
import swaggerOptions from './configs/documentation.config';
import path from 'path';
import fs from 'fs';
import HTTP_STATUS from './constants/status.constant';
dotenv.config();

const app: Application = express();

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/blockchain', blockchainRouter);

app.all('/', (req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).send('Hello, TypeScript with Express!');
});

const swaggerSpec: object = swaggerJsdoc(swaggerOptions);
const swaggerJsonPath: string = path.join(
    __dirname,
    'documentation',
    'swagger.json'
);
fs.writeFileSync(swaggerJsonPath, JSON.stringify(swaggerSpec, null, 2));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware.errorHandler);
app.use(errorMiddleware.notFound);

export default app;
