const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const {
    fileUploadAbilityCheckController,
    fileUploadController,
    getFilesController,
} = require('../controllers/file-controller');

const fileRouter = Router();

fileRouter.post('/upload/check', authMW, fileUploadAbilityCheckController);

fileRouter.post('/upload', authMW, fileUploadController);

fileRouter.get('/recent', authMW, getFilesController);

module.exports = fileRouter;
