import { Router } from 'express';
import blockchainController from '../../controllers/blockchain.controller';
import multer from 'multer';
import multerConfig from '../../configs/multer.config';

const blockchainRouter: Router = Router();
const upload = multer(multerConfig);

blockchainRouter.get(
    '/retrieve-metadata',
    blockchainController.retrieveMetaDataFromBlockchain
);

blockchainRouter.post(
    '/store-metadata',
    blockchainController.storeCIDToBlockchain
);

blockchainRouter.post(
    '/upload-video',
    upload.single('video'),
    blockchainController.uploadVideoToIPFS
);

export default blockchainRouter;
