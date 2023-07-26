const express = require('express')

const app = express()

const PORT = 5000;

app.get('/healthcheck', (req, res) => {
    return res.sendStatus(200)
})

app.listen(PORT, () => console.log(`App is listening on ${PORT}`))