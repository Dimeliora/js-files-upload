const MIME_TYPE_ICONS_MAP = {
    'image/gif': 'image-file',
    'image/jpeg': 'image-file',
    'image/png': 'image-file',
    'image/svg+xml': 'image-file',
    'image/webp': 'image-file',
    'text/plain': 'txt-file',
    'text/html': 'html-file',
    'text/css': 'css-file',
    'text/javascript': 'js-file',
    'video/mp4': 'mp4-file',
    'audio/mpeg': 'mp3-file',
    'application/zip': 'zip-file',
    'application/x-zip-compressed': 'zip-file',
    'application/pdf': 'pdf-file',
    'application/json': 'json-file',
    'application/x-msdownload': 'exe-file',
};

export const getMimeTypeIcon = (mime) =>
    MIME_TYPE_ICONS_MAP[mime] || 'common-file';
