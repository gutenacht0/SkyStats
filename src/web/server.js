const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();
const port = 3000;


process.on('uncaughtException', (error) => console.log(error));
process.on('unhandledRejection', (error) => console.log(error));

const limiter = rateLimit({
    windowMs: 1000 * 60, // 1 minute
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: 'Too many requests, please try again later.',
    },
});

app.use(express.static(__dirname + '/'));
app.use(limiter);
app.use(require('cors')());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});