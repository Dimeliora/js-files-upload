const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const { getUserDataController } = require('../controllers/user-controller');

const userRouter = Router();

userRouter.get('/', authMW, getUserDataController);

module.exports = userRouter;
