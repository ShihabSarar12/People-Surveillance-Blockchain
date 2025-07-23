import dotenv from 'dotenv';
import mysql, { Pool as PromisePool } from 'mysql2/promise';

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

export default pool;
