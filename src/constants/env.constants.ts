import dotenv from 'dotenv';

dotenv.config();

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB,
    NODE_ENV,
    PORT,
    URL,
} = process.env;

export {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB,
    NODE_ENV,
    PORT,
    URL,
};
