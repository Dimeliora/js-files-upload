const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const { fileUploadAbilityCheck, fileUpload } = require('../controllers/file-controller');

const fileRouter = Router();

fileRouter.post('/upload/check', authMW, fileUploadAbilityCheck);

fileRouter.post('/upload', authMW, fileUpload);

module.exports = fileRouter;
