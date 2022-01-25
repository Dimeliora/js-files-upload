require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');

const dbConnect = require('./db/db-connection');
const corsMW = require('./middlewares/cors-middleware');
const authRouter = require('./routes/auth.routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(corsMW);

app.use('/api/auth', authRouter);

const startup = async () => {
    try {
        await dbConnect();

        app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

startup();
