import express from 'express';
import deserializedUser from '../middleware/deserializedUser';
import cookieParser from 'cookie-parser';
import routes from '../routes/index.routes';
import config from 'config';
import cors from 'cors';

function createServer() {
    const app = express();

    app.use(cors({ origin: config.get('origin'), credentials: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(deserializedUser);

    routes(app);

    return app;
}

export default createServer;
