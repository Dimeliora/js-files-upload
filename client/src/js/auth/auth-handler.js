import {
    createAuthHTML,
    createLoginFormHTML,
    createRegisterFormHTML,
} from './auth-template-creators';
import { getAuthElms } from './auth-dom-elements';

export const authHandler = (appContainer) => {
    appContainer.innerHTML = createAuthHTML();

    const authElms = getAuthElms(appContainer);

    authElms.authFormsContainerElm.insertAdjacentHTML(
        'beforeend',
        createLoginFormHTML()
    );

    authElms.authFormsContainerElm.insertAdjacentHTML(
        'beforeend',
        createRegisterFormHTML()
    );
};
