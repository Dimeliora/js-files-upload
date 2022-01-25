const { Router } = require('express');

const authRouter = Router();

authRouter.get('/', () => {});

authRouter.get('/login', () => {});

exports.authRouter = authRouter;
