import blockchainService, { PublicUser } from '../services/blockchain.service';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatus from '../constants/status.constant';

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
            res.status(HttpStatus.OK).json({
                message: 'Blockchain controller initialized successfully',
            });
        }
    );

    /* prettier-ignore-start */
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
     *                 user:
     *                   type: object
     *                   description: User data retrieved from the blockchain
     *                   properties:
     *                     id:
     *                       type: integer
     *                     name:
     *                       type: string
     *                     email:
     *                       type: string
     *                       format: email
     *                       description: Must be a valid email address and unique
     *                 query:
     *                   type: string
     *       400:
     *         description: Invalid user ID
     *       404:
     *         description: User with the given ID not found
     */
    /* prettier-ignore-end */
    public getUserData = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const userId: number = parseInt(req.params.id);
            const query: string = req.query.q as string;
            const sanitizedQuery: string =
                blockchainService.sanitizeQuery(query);
            if (isNaN(userId)) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    error: 'Invalid user ID',
                });
                return;
            }

            const user: PublicUser | null = await blockchainService.getUserData(
                userId
            );
            if (!user) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: `User with ID ${userId} not found`,
                });
                return;
            }

            res.status(HttpStatus.OK).json({
                user,
                query: sanitizedQuery,
            });
        }
    );
}

export default new BlockchainController();
