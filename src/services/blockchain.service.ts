import blockchainRepository from '../repositories/blockchain.repository';
import User from '../models/user.model';

class BlockchainService {
    constructor() {}

    public async initializeBlockchain(): Promise<void> {
        console.log('Blockchain initialized successfully');
    }

    public async getUserData(userId: number): Promise<User | null> {
        const user: User | null = await blockchainRepository.getUserById(
            userId
        );
        if (!user) {
            console.error(`User with ID ${userId} not found`);
            return null;
        }
        return user;
    }
}

export default new BlockchainService();
