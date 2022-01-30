const PROPER_IMAGE_MIME_TYPES = {
    'image/jpeg': true,
    'image/png': true,
    'image/webp': true,
};

exports.isProperImageFile = (mime) => PROPER_IMAGE_MIME_TYPES[mime];
