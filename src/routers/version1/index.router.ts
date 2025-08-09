import { Router } from 'express';
import blockchainRouter from './blockchain.router';

const routerV1 = Router();

routerV1.use('/blockchain', blockchainRouter);

export default routerV1;
