const { connect } = require('mongoose');
require('dotenv/config');

const dbConnect = async () =>
    connect(process.env.DB_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

exports.dbConnect = dbConnect;
