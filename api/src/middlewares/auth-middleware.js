require('dotenv/config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
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
        return res.status(400).json({ message: 'Authorization failed' });
    }
};
