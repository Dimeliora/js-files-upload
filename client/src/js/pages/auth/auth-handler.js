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
import { ee } from '../../helpers/event-emitter';
import { getAuthElms } from './auth-dom-elements';
import { userLogin } from '../../service/api-service';
import { alertHandle } from '../../alerts/alerts-handler';

const getLoginFormSubmitHandler = (authElms) => async (e) => {
    e.preventDefault();

    const email = authElms.loginEmailInput.value;
    const password = authElms.loginPasswordInput.value;

    try {
        const { accessToken, user } = await userLogin(email, password);

        ee.emit('auth/user-logged-in', { accessToken, user });
    } catch (error) {
        alertHandle(error.message);
    }
};

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

    authElms.loginFormElm.addEventListener(
        'submit',
        getLoginFormSubmitHandler(authElms)
    );
};
