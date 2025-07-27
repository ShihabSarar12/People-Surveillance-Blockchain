import 'reflect-metadata';
import app from './app';
import dotenv from 'dotenv';
import migration from './migrations/index.migration';
import logger from './utilities/logger.utility';
import initializeCrons from './crons/index.cron';

dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3000');

app.listen(PORT, async () => {
    initializeCrons();
    console.log('-----------------------------------');
    await migration.up();
    await migration.status();
    logger.info(`Server started on port ${PORT}: http://localhost:${PORT}`);
    logger.info(
        `API Documentation available at http://localhost:${PORT}/api-docs`
    );
    console.log('-----------------------------------');
});
