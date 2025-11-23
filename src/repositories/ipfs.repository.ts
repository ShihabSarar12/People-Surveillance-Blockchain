import { create } from 'kubo-rpc-client';
import fs from 'fs';
import HttpError from '../errors/http.error';
import HttpStatus from '../constants/status.constant';
import logger from '../utilities/logger.utility';

class IPFSRepository {
    private ipfs;
    constructor() {
        this.ipfs = create({
            url: 'http://127.0.0.1:5001/api/v0',
        });
    }

    public uploadFileToIPFS = async (
        filePath: string
    ): Promise<{
        cid: string;
        fileSize: number;
    }> => {
        try {
            const fileStream = fs.createReadStream(filePath);

            const result = await this.ipfs.add(fileStream, {
                pin: true,
                wrapWithDirectory: false,
            });

            const cid = result.cid.toString();
            if (!cid || !result) {
                throw new HttpError(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    'Failed to upload file to IPFS'
                );
            }
            return {
                cid,
                fileSize: result.size,
            };
        } catch (error: any) {
            if (error instanceof HttpError) {
                throw error;
            }
            logger.error(
                'IPFS Repository: Unexpected error occurred in retrieveMetaData',
                {
                    error: error?.message ?? error,
                }
            );
            throw new HttpError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Failed to upload file to IPFS'
            );
        }
    };
}

export default new IPFSRepository();
