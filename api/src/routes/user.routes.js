const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const {
    getUserDataController,
    getUserAvatarController,
    uploadUserAvatarController,
} = require('../controllers/user-controller');

const userRouter = Router();

userRouter.get('/', authMW, getUserDataController);

userRouter.get('/avatar', authMW, getUserAvatarController);

userRouter.post('/avatar', authMW, uploadUserAvatarController);

module.exports = userRouter;
