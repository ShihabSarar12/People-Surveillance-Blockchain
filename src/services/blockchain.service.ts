import blockchainRepository from '../repositories/blockchain.repository';
import User from '../models/user.model';
import logger from '../utilities/logger.utility';
import sanitizeHTMLConfig from '../configs/sanitizeHTML.config';
import sanitize from 'sanitize-html';

type PublicUser = Omit<User, 'password'>;

class BlockchainService {
    constructor() {}

    public initializeBlockchain = async (): Promise<void> => {
        logger.info('Blockchain initialized successfully');
    };

    public getUserData = async (userId: number): Promise<PublicUser | null> => {
        const user: User | null = await blockchainRepository.getUserById(
            userId
        );
        if (!user) {
            logger.error(`User with ID ${userId} not found`);
            return null;
        }
        const { password: _, ...publicUser } = user;
        return publicUser;
    };

    public sanitizeQuery = (query: string): string => {
        return sanitize(query, sanitizeHTMLConfig);
    };
}

export type { PublicUser };
export default new BlockchainService();
