export const getUploadElms = (rootElement) => ({
    uploadInputElm: rootElement.querySelector('[data-upload-input]'),
    uploadDropzoneElm: rootElement.querySelector('[data-upload-dropzone]'),
});
