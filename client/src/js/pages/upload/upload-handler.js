import { v4 } from 'uuid';

import FileItem from './upload-file-model';
import CancelError from '../../errors/cancel-error';
import uploadState from '../../state/upload-state';
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

const uploadInputChangeHandler = (e) => {
    uploadFilesMainRoutine(e.target.files);
};

const getDropzoneClickHandler = (uploadElms) => () => {
    uploadElms.uploadInputElm.click();
};

const dropzoneDragOverHandler = (e) => {
    e.preventDefault();
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

    const dataTransferEntries = [...e.dataTransfer.items].map((item) =>
        item.webkitGetAsEntry()
    );
    uploadFilesMainRoutine(dataTransferEntries);
};

const uploadFilesMainRoutine = async (filesList) => {
    if (filesList.length === 0) {
        return;
    }

    const files = await proceedFilesList(filesList);
    const fileItems = [...files].map((file) => new FileItem(v4(), file));

    const uploadModalElms = prepareUploadModalElm(fileItems);

    uploadState.setFilesToUpload(fileItems);

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

    if (uploadState.isUploadSuccessful) {
        ee.emit('upload/resync-needed');
    }
};

const proceedFilesList = async (filesList) => {
    if (filesList instanceof FileList) {
        return filesList;
    }

    const filePromises = [];
    for (const item of filesList) {
        if (item.isFile) {
            filePromises.push(
                new Promise((resolve) => {
                    item.file((file) => resolve(file));
                })
            );
        } else {
            const dirReader = item.createReader();
            filePromises.push(
                new Promise((resolve) => {
                    dirReader.readEntries((dirItems) => {
                        resolve(proceedFilesList(dirItems));
                    });
                })
            );
        }
    }

    const files = await Promise.all(filePromises);
    return files.flat(Infinity);
};

const prepareUploadModalElm = (filesItems) => {
    const uploadModalElms = renderUploadFilesModal(filesItems);

    const uploadFileElms = uploadModalElms.uploadFilesListElm.children;

    for (const fileElm of uploadFileElms) {
        const id = fileElm.dataset.uploadFile;

        const fileItem = filesItems.find((item) => item.id === id);
        fileItem.domElm = fileElm;

        const uploadFileAbortElm = getUploadFileAbortElm(fileElm);
        uploadFileAbortElm.addEventListener(
            'click',
            getFileUploadAbortHandler(fileItem)
        );
    }

    return uploadModalElms;
};

const abortFilesUploadHandler = () => {
    for (const file of uploadState.uploadFiles) {
        getFileUploadAbortHandler(file)();
    }
};

const getFileUploadAbortHandler = (fileItem) => () => {
    if (fileItem.status === 'uploading') {
        ee.emit('upload/abort');
        return;
    }

    if (fileItem.status === 'pending') {
        fileItem.status = 'cancelled';
        fileItem.message = 'Cancelled';

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
                fileItem.message = 'Completed';

                disableUploadFileAbortElm(fileItem.domElm);

                uploadState.setSuccefullUpload();
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

const getFilesUploadCompleteConfirmHandler = (uploadModalElm) => () => {
    uploadState.resetUploadState();

    uploadModalElm.remove();

    window.location.hash = 'recent';
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
        'click',
        getDropzoneClickHandler(uploadElms)
    );

    uploadElms.uploadDropzoneElm.addEventListener(
        'dragover',
        dropzoneDragOverHandler
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
