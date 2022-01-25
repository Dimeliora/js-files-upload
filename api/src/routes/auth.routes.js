const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const { auth, login } = require('../controllers/auth-controller');

const authRouter = Router();

authRouter.get('/', authMW, auth);

authRouter.post('/login', login);

module.exports = authRouter;
