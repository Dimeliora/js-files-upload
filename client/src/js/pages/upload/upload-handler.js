import { v4 } from 'uuid';

import { ee } from '../../helpers/event-emitter';
import { getUploadElms } from './upload-dom-elements';
import {
    setDropzoneHoveredClass,
    removeDropzoneHoveredClass,
    renderUploadFilesModal,
    getUploadFileAbortElm,
    updateUploadFileElmStatus,
    getUpdateFileProgressHandler,
} from './upload-view-updates';
import { createUploadHTML } from './upload-template-creators';
import { fileUpload } from '../../services/file-service';
import uploadState, { FileItem } from '../../state/upload-state';
import CancelError from '../../errors/cancel-error';

const getFileUploadAbortHandler = (fileItem) => () => {
    if (fileItem.status === 'uploading') {
        ee.emit('upload/abort');
    } else {
        fileItem.status = 'cancelled';
        fileItem.error = 'Upload cancelled';

        updateUploadFileElmStatus(
            fileItem.domElm,
            fileItem.status,
            fileItem.error
        );
    }
};

const handleFilesToUpload = async (files) => {
    const uploadFileItems = [...files].map((file) => new FileItem(v4(), file));

    const uploadModalInnerElms = renderUploadFilesModal(uploadFileItems);

    const uploadFileElms = uploadModalInnerElms.uploadFilesListElm.children;

    for (const fileElm of uploadFileElms) {
        const id = fileElm.dataset.uploadFile;

        const fileItem = uploadFileItems.find((item) => item.id === id);
        fileItem.domElm = fileElm;

        const uploadFileAbortElm = getUploadFileAbortElm(fileElm);
        uploadFileAbortElm.addEventListener(
            'click',
            getFileUploadAbortHandler(fileItem)
        );
    }

    uploadState.files = uploadFileItems;

    for (const fileItem of uploadState.files) {
        if (fileItem.status === 'cancelled') {
            continue;
        }

        fileItem.status = 'uploading';

        const unsubscribeProgressChangeEvent = ee.on(
            'upload/progress-changed',
            getUpdateFileProgressHandler(fileItem.domElm)
        );

        try {
            await fileUpload(fileItem.file);

            fileItem.status = 'done';
        } catch (error) {
            fileItem.status =
                error instanceof CancelError ? 'cancelled' : 'error';

            fileItem.error = error.message;
        } finally {
            updateUploadFileElmStatus(
                fileItem.domElm,
                fileItem.status,
                fileItem.error
            );

            unsubscribeProgressChangeEvent();
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
    appContainer.innerHTML = createUploadHTML();

    const uploadElms = getUploadElms(appContainer);

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
