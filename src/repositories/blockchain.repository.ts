import { Pool as PromisePool } from 'mysql2/promise';
import pool from '../configs/db.config';
import User from '../models/user.model';

class BlockchainRepository {
    private pool: PromisePool;

    constructor() {
        this.pool = pool;
    }

    public getAllUsers = async (): Promise<User[] | null> => {
        const [users] = await this.pool.query<User[]>(`SELECT * FROM users`);
        return users.length > 0 ? users : null;
    };

    public getUserById = async (id: number): Promise<User | null> => {
        const [[user]] = await this.pool.query<User[]>(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );
        return user ?? null;
    };
}

export default new BlockchainRepository();
