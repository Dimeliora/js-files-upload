const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const {
    authController,
    loginController,
    registerController,
} = require('../controllers/auth-controller');
const {
    emailValidator,
    passwordValidator,
} = require('../validation/user-validation');

const authRouter = Router();

authRouter.get('/', authMW, authController);

authRouter.post('/login', loginController);

authRouter.post(
    '/register',
    [emailValidator, passwordValidator],
    registerController
);

module.exports = authRouter;
