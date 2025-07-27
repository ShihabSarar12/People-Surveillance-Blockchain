import blockchainService from '../services/blockchain.service';
import { Request, Response } from 'express';
import User from '../models/user.model';
import asyncHandler from 'express-async-handler';
import HTTP_STATUS from '../constants/status.constant';

/**
 * @swagger
 * tags:
 *   name: Blockchain
 *   description: API to manage blockchain operations
 */
class BlockchainController {
    constructor() {}

    public initialize = asyncHandler(
        async (_: Request, res: Response): Promise<void> => {
            await blockchainService.initializeBlockchain();
            res.status(HTTP_STATUS.OK).json({
                message: 'Blockchain controller initialized successfully',
            });
        }
    );

    // prettier-ignore
    /**
     * @swagger
     * /api/blockchain/users/{id}:
     *   get:
     *     summary: Get user data by ID
     *     description: Retrieve user data from the blockchain by user ID
     *     tags: [Blockchain]
     *     responses:
     *       200:
     *         description: A single user object
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 email:
     *                   type: string
     *                   format: email
     *                   description: Must be a valid email address and unique
     *                 password:
     *                   type: string
     *                   format: password
     *                   minLength: 6
     *                   description: Must be a valid password that contains One uppercase letter, one lowercase letter, one number, and one special character. Minimum length is 6.
     *       400:
     *         description: Invalid user ID
     *       404:
     *         description: User with the given ID not found
     */
    public getUserData = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const userId: number = parseInt(req.params.id);
            if (isNaN(userId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid user ID' });
                return;
            }

            const user: User | null = await blockchainService.getUserData(
                userId
            );
            if (!user) {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    error: `User with ID ${userId} not found`,
                });
                return;
            }

            res.status(HTTP_STATUS.OK).json(user);
        }
    );
}

export default new BlockchainController();
