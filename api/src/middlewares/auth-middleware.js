require('dotenv/config');
const jwt = require('jsonwebtoken');

const authMW = (req, res, next) => {
    if ((req.method = 'OPTIONS')) {
        return next();
    }

    try {
        const [_, token] = req.headers.authorization.split(' ');
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(400).json({ msg: 'Authorization failed' });
    }
};

exports.authMW = authMW;
