import express from 'express';

const port = 5000;

const app = express();
app.use(express.json());

app.get('/healthcheck', (req, res) => {
    return res.sendStatus(200);
});

app.listen(port, () => console.log(`App is listening on http://localhost:${port}`));
