module.exports = class FileError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileError';
    }
};
