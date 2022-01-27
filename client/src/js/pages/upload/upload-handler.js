import { v4 } from 'uuid';

import { ee } from '../../helpers/event-emitter';
import {
    getUploadElms,
    getUploadModalElms,
    getUploadFileElms,
} from './upload-dom-elements';
import {
    setDropzoneHoveredClass,
    removeDropzoneHoveredClass,
} from './upload-view-updates';
import {
    createUploadHTML,
    createUploadModalHTML,
    createUploadFileHTML,
} from './upload-template-creators';
import { fileUpload } from '../../services/file-service';
import uploadState, { FileItem } from '../../state/upload-state';

const handleFilesToUpload = async (files) => {
    const fileItems = [...files].map((file) => new FileItem(v4(), file));

    uploadState.setFilesToUpload(fileItems);

    document.body.insertAdjacentHTML('beforeend', createUploadModalHTML());

    const uploadModalElm = document.querySelector('[data-upload-modal]');
    const uploadModalInnerElms = getUploadModalElms(uploadModalElm);

    const uploadFilesMarkup = uploadState.files
        .map((file) => createUploadFileHTML(file.id, file.name))
        .join(' ');
    uploadModalInnerElms.uploadFilesListElm.insertAdjacentHTML(
        'beforeend',
        uploadFilesMarkup
    );

    for (const { id, file } of uploadState.files) {
        const uploadFilesListItemElm =
            uploadModalInnerElms.uploadFilesListElm.querySelector(
                `[data-upload-file="${id}"]`
            );
        const uploadFileInnerElms = getUploadFileElms(uploadFilesListItemElm);

        const unsubProgressChangeEvn = ee.on(
            'upload/progress-changed',
            (progress) => {
                uploadFileInnerElms.uploadFileProgressBar.style.width = `${progress}%`;
                uploadFileInnerElms.uploadFileProgressValue.textContent = `${progress}%`;
            }
        );

        try {
            await fileUpload(file);

            uploadFilesListItemElm.classList.add('upload-files__item--done');
        } catch (error) {
            uploadFileInnerElms.uploadFileError.textContent = error.message;
            uploadFilesListItemElm.classList.add('upload-files__item--error');
        } finally {
            unsubProgressChangeEvn();
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
