import { getUploadElms } from './upload-dom-elements';
import {
    setDropzoneHoveredClass,
    removeDropzoneHoveredClass,
} from './upload-view-updates';
import { createUploadHTML } from './upload-template-creators';
import { fileUpload } from '../../services/file-service';
import { alertHandle } from '../../alerts/alerts-handler';

const renderBlockAndGetDOMElms = (rootElement) => {
    rootElement.innerHTML = createUploadHTML();
    return getUploadElms(rootElement);
};

const handleFilesToUpload = async (files) => {
    for (const file of files) {
        try {
            const fileData = await fileUpload(file);

            console.log(fileData);
        } catch (error) {
            alertHandle(error.message, 'error');
        }
    }
};

const uploadInputChangeHandler = (e) => {
    handleFilesToUpload(e.target.files);
};

const dropzoneDragOverHandler = (e) => {
    e.preventDefault();
};

const getDropzoneClickHandler = (uploadElms) => () => {
    uploadElms.uploadInputElm.click();
};

const getDropzoneDragEnterHandler = (uploadElms) => (e) => {
    e.preventDefault();

    setDropzoneHoveredClass(uploadElms.uploadDropzoneElm);
};

const getDropzoneDragLeaveHandler = (uploadElms) => () => {
    removeDropzoneHoveredClass(uploadElms.uploadDropzoneElm);
};

const getDropzoneDropHandler = (uploadElms) => (e) => {
    e.preventDefault();

    removeDropzoneHoveredClass(uploadElms.uploadDropzoneElm);

    handleFilesToUpload(e.dataTransfer.files);
};

export const uploadHandler = (appContainer) => {
    const uploadElms = renderBlockAndGetDOMElms(appContainer);

    uploadElms.uploadInputElm.addEventListener(
        'change',
        uploadInputChangeHandler
    );

    uploadElms.uploadDropzoneElm.addEventListener(
        'dragover',
        dropzoneDragOverHandler
    );

    uploadElms.uploadDropzoneElm.addEventListener(
        'click',
        getDropzoneClickHandler(uploadElms)
    );

    uploadElms.uploadDropzoneElm.addEventListener(
        'dragenter',
        getDropzoneDragEnterHandler(uploadElms)
    );

    uploadElms.uploadDropzoneElm.addEventListener(
        'dragleave',
        getDropzoneDragLeaveHandler(uploadElms)
    );

    uploadElms.uploadDropzoneElm.addEventListener(
        'drop',
        getDropzoneDropHandler(uploadElms)
    );
};
