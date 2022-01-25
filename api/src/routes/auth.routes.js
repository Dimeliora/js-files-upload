const { Router } = require('express');

const { authMW } = require('../middlewares/auth-middleware');

const authRouter = Router();

authRouter.get('/', authMW, () => {});

authRouter.get('/login', () => {});

exports.authRouter = authRouter;
