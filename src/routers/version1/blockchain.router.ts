import { Router } from 'express';
import blockchainController from '../../controllers/blockchain.controller';
import validateDTO from '../../middlewares/validateDTO.middleware';
import CreateUserDTO from '../../dtos/blockchain.dto';

const blockchainRouter: Router = Router();

blockchainRouter.get('/message', blockchainController.initialize);
blockchainRouter.post(
    '/test',
    validateDTO(CreateUserDTO),
    blockchainController.initialize
);
blockchainRouter.get('/user/:id', blockchainController.getUserData);

export default blockchainRouter;
