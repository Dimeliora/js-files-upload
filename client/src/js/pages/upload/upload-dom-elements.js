export const getUploadElms = (rootElement) => ({
    uploadInputElm: rootElement.querySelector('[data-upload-input]'),
    uploadDropzoneElm: rootElement.querySelector('[data-upload-dropzone]'),
});

export const getUploadModalElms = (modalElm) => ({
    uploadModalElm: modalElm,
    uploadFilesBlockElm: modalElm.querySelector('[data-upload-block]'),
    uploadFilesListElm: modalElm.querySelector('[data-upload-files-list]'),
    uploadCancelElm: modalElm.querySelector('[data-upload-cancel]'),
    uploadDoneElm: modalElm.querySelector('[data-upload-done]'),
});

export const getUploadFileElms = (uploadFileElm) => ({
    uploadFileProgressBar: uploadFileElm.querySelector(
        '[data-upload-file-progress-bar]'
    ),
    uploadFileProgressValue: uploadFileElm.querySelector(
        '[data-upload-file-progress-value]'
    ),
    uploadFileMessage: uploadFileElm.querySelector('[data-upload-file-message]'),
    uploadFileAbort: uploadFileElm.querySelector('[data-upload-file-abort]'),
});
