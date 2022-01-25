require('dotenv/config');
const { connect } = require('mongoose');

module.exports = async () =>
    connect(process.env.DB_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
