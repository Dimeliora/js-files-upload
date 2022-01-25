import {
    createAuthHTML,
    createLoginFormHTML,
    createRegisterFormHTML,
} from './auth-template-creators';
import {
    getLoginFormSwitchHandler,
    getRegisterFormSwitchHandler,
    getLoginFormTransitionHandler,
    getRegisterFormTransitionHandler,
} from './auth-view-updates';
import { getAuthElms } from './auth-dom-elements';



export const authHandler = (appContainer) => {
    appContainer.innerHTML = createAuthHTML();

    const authFormsContainerElm =
        appContainer.querySelector('[data-auth-forms]');

    authFormsContainerElm.insertAdjacentHTML(
        'beforeend',
        createLoginFormHTML()
    );
    authFormsContainerElm.insertAdjacentHTML(
        'beforeend',
        createRegisterFormHTML()
    );

    const authElms = getAuthElms(appContainer);

    authElms.loginFormSwitchElm.addEventListener(
        'click',
        getLoginFormSwitchHandler(authElms)
    );

    authElms.registerFormSwitchElm.addEventListener(
        'click',
        getRegisterFormSwitchHandler(authElms)
    );

    authElms.loginFormElm.addEventListener(
        'transitionend',
        getLoginFormTransitionHandler(authElms)
    );

    authElms.registerFormElm.addEventListener(
        'transitionend',
        getRegisterFormTransitionHandler(authElms)
    );
};
