// Dep
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

// Utils
import createServer from './utils/server';
import logger from './utils/logger';
import connect from './utils/connect';

const port = config.get<number>('port');

const app = createServer();

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    await connect();
});
