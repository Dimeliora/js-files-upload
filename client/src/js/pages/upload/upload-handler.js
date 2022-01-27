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
import FileItem from './upload-file-model';
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

const uploadFiles = async (files) => {
    for (const fileItem of files) {
        if (fileItem.status === 'cancelled') {
            continue;
        }

        fileItem.status = 'uploading';

        const unsubscribeProgressChangeEvent = ee.on(
            'upload/progress-changed',
            getUpdateFileProgressHandler(fileItem.domElm)
        );

        const unsubscribeUploadCompleteEvent = ee.on(
            'upload/upload-complete',
            () => {
                fileItem.status = 'done';
                updateUploadFileElmStatus(
                    fileItem.domElm,
                    fileItem.status,
                    fileItem.error
                );
            }
        );

        try {
            await fileUpload(fileItem.file);
        } catch (error) {
            fileItem.status =
                error instanceof CancelError ? 'cancelled' : 'error';

            fileItem.error = error.message;

            updateUploadFileElmStatus(
                fileItem.domElm,
                fileItem.status,
                fileItem.error
            );
        } finally {
            unsubscribeProgressChangeEvent();
            unsubscribeUploadCompleteEvent();
        }
    }
};

const uploadFilesHandler = async (files) => {
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

    await uploadFiles(uploadFileItems);

    console.log('Uploaded');
};

const uploadInputChangeHandler = (e) => {
    uploadFilesHandler(e.target.files);
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

    uploadFilesHandler(e.dataTransfer.files);
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
