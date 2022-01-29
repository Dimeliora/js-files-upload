const { Schema, model, Types } = require('mongoose');

const FileSchema = new Schema(
    {
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
        path: {
            type: String,
            required: true,
        },
        user: {
            type: Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const File = model('File', FileSchema);

module.exports = File;
