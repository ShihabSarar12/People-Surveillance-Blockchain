import blockchainService from '../services/blockchain.service';
import { Request, Response } from 'express';
import User from '../models/user.model';
import asyncHandler from 'express-async-handler';

class BlockchainController {
    constructor() {}

    public initialize = asyncHandler(
        async (_: Request, res: Response): Promise<void> => {
            await blockchainService.initializeBlockchain();
            res.status(200).json({
                message: 'Blockchain controller initialized successfully',
            });
        }
    );

    public getUserData = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const userId: number = parseInt(req.params.id);
            if (isNaN(userId)) {
                res.status(400).json({ error: 'Invalid user ID' });
                return;
            }

            const user: User | null = await blockchainService.getUserData(
                userId
            );
            if (!user) {
                res.status(404).json({
                    error: `User with ID ${userId} not found`,
                });
                return;
            }

            res.status(200).json(user);
        }
    );
}

export default new BlockchainController();
