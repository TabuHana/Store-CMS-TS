// Dep
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

// Files
import routes from './routes';

// Utils
import logger from './utils/logger';
import sequelize from './utils/connect';

const port = config.get<number>('port');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    console.log('node in production');
}

sequelize.sync().then(() => {
    app.listen(port, () => {
        logger.info(`App is running at http://localhost:${port}`);
        routes(app);
    });
});