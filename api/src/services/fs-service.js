const path = require('path');
const fs = require('fs/promises');

const dataDir = require('../constants/data-dir');

exports.createUserDir = async (userId) => {
    const userFilesDirPath = path.resolve(dataDir, userId, 'files');

    try {
        await fs.mkdir(userFilesDirPath, { recursive: true });
    } catch (error) {
        throw new Error(error.message);
    }
};
