const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const { auth } = require('../controllers/auth-controller');

const authRouter = Router();

authRouter.get('/', authMW, auth);

authRouter.get('/login', () => {});

module.exports = authRouter;
