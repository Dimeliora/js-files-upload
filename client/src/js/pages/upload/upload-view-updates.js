import {
    createUploadModalHTML,
    createUploadFileHTML,
} from './upload-template-creators';
import { getUploadModalElms, getUploadFileElms } from './upload-dom-elements';

const UPLOAD_FILE_ELM_STATE_CLASS_MAP = {
    cancelled: 'upload-files__item--cancelled',
    done: 'upload-files__item--done',
    error: 'upload-files__item--error',
};

export const setDropzoneHoveredClass = (dropzoneElm) => {
    dropzoneElm.classList.add('upload__dropzone-inner--hovered');
};

export const removeDropzoneHoveredClass = (dropzoneElm) => {
    dropzoneElm.classList.remove('upload__dropzone-inner--hovered');
};

export const renderUploadFilesModal = (files) => {
    document.body.insertAdjacentHTML('beforeend', createUploadModalHTML());

    const uploadModalElm = document.querySelector('[data-upload-modal]');
    const uploadModalElms = getUploadModalElms(uploadModalElm);

    const uploadFilesMarkup = files
        .map((file) => createUploadFileHTML(file.id, file.name))
        .join(' ');

    uploadModalElms.uploadFilesListElm.insertAdjacentHTML(
        'beforeend',
        uploadFilesMarkup
    );

    return uploadModalElms;
};

export const getUploadFileAbortElm = (fileElm) => {
    return fileElm.querySelector('[data-upload-file-abort]');
};

export const updateUploadFileElmStatus = (fileElm, uploadState, message) => {
    const classname = UPLOAD_FILE_ELM_STATE_CLASS_MAP[uploadState];
    fileElm.classList.add(classname);

    if (message) {
        const uploadFileInnerElms = getUploadFileElms(fileElm);
        uploadFileInnerElms.uploadFileError.textContent = message;
    }
};

export const getUpdateFileProgressHandler = (fileElm) => {
    const uploadFileInnerElms = getUploadFileElms(fileElm);

    return (progress) => {
        uploadFileInnerElms.uploadFileProgressBar.style.width = `${progress}%`;
        uploadFileInnerElms.uploadFileProgressValue.textContent = `${progress}%`;
    };
};

export const switchUploadFilesModalButtons = (uploadFilesBlockElm) => {
    uploadFilesBlockElm.classList.add('upload-files--done');
};
