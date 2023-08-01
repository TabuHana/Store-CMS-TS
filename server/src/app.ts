// Dep
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

// Files
import routes from './routes';

// Utils
import logger from './utils/logger';
import connect from './utils/connect';

// Middleware
import deserializedUser from './middleware/deserializedUser';

const port = config.get<number>('port');

const app = express();
app.use(express.json());
app.use(deserializedUser)

if (process.env.NODE_ENV === 'production') {
    console.log('node in production');
}

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
    
    await connect();

    routes(app);
});
