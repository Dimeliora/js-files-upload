const path = require('path');

const rootDir = path.dirname(
    require.main.filename || process.mainModule.filename
);

const dataDir = path.resolve(rootDir, '../data');

const getUserFilesDir = (userId) => path.resolve(dataDir, userId, 'files');

const getRelativeFilePath = (userId, filename) =>
    path.join(userId, 'files', filename);

module.exports = {
    rootDir,
    dataDir,
    getUserFilesDir,
    getRelativeFilePath,
};
