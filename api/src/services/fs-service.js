const path = require('path');
const fs = require('fs/promises');

const dataDir = require('../constants/data-dir');

exports.createUserDir = async (userId) => {
    const userDirPath = path.resolve(dataDir, userId);

    try {
        await fs.mkdir(userDirPath);
    } catch (error) {
        throw new Error(error.message);
    }
};
