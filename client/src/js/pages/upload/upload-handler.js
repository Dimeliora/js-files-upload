import { v4 } from 'uuid';

import { ee } from '../../helpers/event-emitter';
import { getUploadElms } from './upload-dom-elements';
import {
    setDropzoneHoveredClass,
    removeDropzoneHoveredClass,
    renderUploadFilesModal,
    getUploadFileAbortElm,
    disableUploadFileAbortElm,
    updateUploadFileElmStatus,
    getUpdateFileProgressHandler,
    switchUploadFilesModalButtons,
} from './upload-view-updates';
import { createUploadHTML } from './upload-template-creators';
import { headerHandler } from '../../components/header/header-handler';
import { fileUpload } from '../../services/file-service';
import FileItem from './upload-file-model';
import CancelError from '../../errors/cancel-error';
import uploadState from '../../state/upload-state';

const getFileUploadAbortHandler = (fileItem) => () => {
    if (fileItem.status === 'uploading') {
        ee.emit('upload/abort');
        return;
    }

    if (fileItem.status === 'pending') {
        fileItem.status = 'cancelled';
        fileItem.message = 'Upload cancelled';

        updateUploadFileElmStatus(
            fileItem.domElm,
            fileItem.status,
            fileItem.message
        );
    }
};

const uploadFiles = async () => {
    for (const fileItem of uploadState.uploadFiles) {
        if (!uploadState.isUploading) {
            return;
        }

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
                fileItem.message = 'Upload completed';

                disableUploadFileAbortElm(fileItem.domElm);
            }
        );

        try {
            await fileUpload(fileItem.file);
        } catch (error) {
            if (fileItem.status !== 'done') {
                fileItem.status =
                    error instanceof CancelError ? 'cancelled' : 'error';

                fileItem.message = error.message;
            }
        } finally {
            updateUploadFileElmStatus(
                fileItem.domElm,
                fileItem.status,
                fileItem.message
            );

            unsubscribeProgressChangeEvent();
            unsubscribeUploadCompleteEvent();
        }
    }
};

const abortFilesUploadHandler = () => {
    uploadState.resetUploading();

    for (const file of uploadState.uploadFiles) {
        getFileUploadAbortHandler(file)();
    }
};

const getFilesUploadCompleteConfirmHandler = (uploadModalElm) => () => {
    uploadState.resetUploadState();

    uploadModalElm.remove();
};

const prepareFilesForUpload = async (files) => {
    const uploadFileItems = [...files].map((file) => new FileItem(v4(), file));

    const uploadModalElms = renderUploadFilesModal(uploadFileItems);

    const uploadFileElms = uploadModalElms.uploadFilesListElm.children;

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

    uploadState.setFilesToUpload(uploadFileItems);

    uploadModalElms.uploadCancelElm.addEventListener(
        'click',
        abortFilesUploadHandler
    );

    await uploadFiles();

    switchUploadFilesModalButtons(uploadModalElms.uploadFilesBlockElm);

    uploadModalElms.uploadDoneElm.addEventListener(
        'click',
        getFilesUploadCompleteConfirmHandler(uploadModalElms.uploadModalElm)
    );
};

const uploadInputChangeHandler = (e) => {
    prepareFilesForUpload(e.target.files);
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

    prepareFilesForUpload(e.dataTransfer.files);
};

export const uploadHandler = (appContainer) => {
    appContainer.innerHTML = createUploadHTML();

    const uploadElms = getUploadElms(appContainer);

    headerHandler(uploadElms.uploadBlockElm);

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
