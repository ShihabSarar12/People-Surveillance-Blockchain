import dotenv from 'dotenv';
import mysql, { Pool as PromisePool } from 'mysql2/promise';
import logger from '../utilities/logger.utility';

dotenv.config();
const pool: PromisePool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

(async () => {
    const connection = await pool.getConnection();
    logger.info('Database connected successfully');
    connection.release();
})().catch((err: any) => {
    console.error(
        `Database connection failed: ${err.name}: ${err.message}\n${err.stack}`
    );
    process.exit(0);
});

export default pool;
