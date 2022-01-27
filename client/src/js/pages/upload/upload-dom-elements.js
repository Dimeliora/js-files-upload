export const getUploadElms = (rootElement) => ({
    uploadInputElm: rootElement.querySelector('[data-upload-input]'),
    uploadDropzoneElm: rootElement.querySelector('[data-upload-dropzone]'),
});

export const getUploadModalElms = (modalElm) => ({
    uploadFilesListElm: modalElm.querySelector('[data-upload-files-list]'),
    uploadCancelElm: modalElm.querySelector('[data-upload-cancel]'),
});

export const getUploadFileElms = (uploadFileElm) => ({
    uploadFileProgressBar: uploadFileElm.querySelector(
        '[data-upload-file-progress-bar]'
    ),
    uploadFileProgressValue: uploadFileElm.querySelector(
        '[data-upload-file-progress-value]'
    ),
    uploadFileError: uploadFileElm.querySelector('[data-upload-file-error]'),
    uploadFileAbort: uploadFileElm.querySelector('[data-upload-file-abort]'),
});
