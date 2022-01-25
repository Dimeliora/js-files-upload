const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const { auth, login, register } = require('../controllers/auth-controller');
const {
    emailValidator,
    passwordValidator,
} = require('../validation/user-validation');

const authRouter = Router();

authRouter.get('/', authMW, auth);

authRouter.post('/login', login);

authRouter.post('/register', [emailValidator, passwordValidator], register);

module.exports = authRouter;
