import {
    createAuthHTML,
    createLoginFormHTML,
    createRegisterFormHTML,
} from './auth-template-creators';
import {
    getSignInFormSwitchHandler,
    getSignUpFormSwitchHandler,
    getSignInFormTransitionHandler,
    getSignUpFormTransitionHandler,
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

    authElms.signInFormSwitchElm.addEventListener(
        'click',
        getSignInFormSwitchHandler(authElms)
    );

    authElms.signUpFormSwitchElm.addEventListener(
        'click',
        getSignUpFormSwitchHandler(authElms)
    );

    authElms.signInFormElm.addEventListener(
        'transitionend',
        getSignInFormTransitionHandler(authElms)
    );

    authElms.signUpFormElm.addEventListener(
        'transitionend',
        getSignUpFormTransitionHandler(authElms)
    );
};
