const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const {
    fileUploadAbilityCheckController,
    fileUploadController,
    getRecentFilesController,
} = require('../controllers/file-controller');

const fileRouter = Router();

fileRouter.post('/upload/check', authMW, fileUploadAbilityCheckController);

fileRouter.post('/upload', authMW, fileUploadController);

fileRouter.get('/get-recent', authMW, getRecentFilesController);

module.exports = fileRouter;
