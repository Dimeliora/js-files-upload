import { getUploadElms } from './upload-dom-elements';
import { createUploadHTML } from './upload-template-creators';

const renderBlockAndGetDOMElms = (rootElement) => {
    rootElement.innerHTML = createUploadHTML();
    return getUploadElms(rootElement);
};

const getUploadDropzoneClickHandler = (uploadElms) => () => {
    uploadElms.uploadInputElm.click();
};

const getUploadInputChangeHandler = () => (e) => {
    console.log(e.target.files);
};

export const uploadHandler = (appContainer) => {
    const uploadElms = renderBlockAndGetDOMElms(appContainer);

    uploadElms.uploadDropzoneElm.addEventListener(
        'click',
        getUploadDropzoneClickHandler(uploadElms)
    );

    uploadElms.uploadInputElm.addEventListener(
        'change',
        getUploadInputChangeHandler()
    );
};
