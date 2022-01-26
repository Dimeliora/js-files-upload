const { Schema, model, Types } = require('mongoose');

const FileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        default: 0,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
    },
});

const File = model('File', FileSchema);

module.exports = File;
