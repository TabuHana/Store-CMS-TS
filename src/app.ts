import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

const port = config.get<number>('port');

const app = express();
app.use(express.json());

app.get('/healthcheck', (req, res) => {
    return res.sendStatus(200);
});

app.listen(port, () => console.log(`App is listening on http://localhost:${port}`));
