const { Router } = require('express');

const authMW = require('../middlewares/auth-middleware');
const { fileUpload } = require('../controllers/file-controller');

const fileRouter = Router();

fileRouter.post('/upload', authMW, fileUpload);

module.exports = fileRouter;
