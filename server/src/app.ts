import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import express from 'express';
import deserializedUser from './middleware/deserializedUser';
import connect from './utils/connect';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/index.routes';
import logger from './utils/logger';

const APP_ENV = config.get<string>('app_env');
const PORT = config.get<number>('port') || 5000;

const app = express();

app.use(cors({ origin: config.get('origin'), credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(deserializedUser);

routes(app);

app.listen(PORT, async () => {
    logger.info(`App is running in ${APP_ENV} mode on http://localhost:${PORT}`);

    await connect();
});

