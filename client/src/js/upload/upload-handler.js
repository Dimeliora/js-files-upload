import { createUploadHTML } from './upload-template-creators';

export const uploadHandler = (appContainer) => {
    appContainer.innerHTML = createUploadHTML();
};
