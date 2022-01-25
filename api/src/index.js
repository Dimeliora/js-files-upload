require('dotenv/config');
const express = require('express');

const { dbConnect } = require('./db/db-connection');

const PORT = process.env.PORT || 3000;

const app = express();

const startup = async () => {
    try {
        await dbConnect();

        app.listen(PORT, () => console.log(`Server is up on ${PORT} port`));
    } catch (error) {
        console.log(error);
    }
};

startup();
