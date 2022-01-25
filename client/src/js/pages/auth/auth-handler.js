import {
    createAuthHTML,
    createLoginFormHTML,
    createRegisterFormHTML,
} from './auth-template-creators';
import {
    formInputErrorClearHandler,
    getLoginFormSwitchHandler,
    getRegisterFormSwitchHandler,
    getLoginFormTransitionHandler,
    getRegisterFormTransitionHandler,
} from './auth-view-updates';
import { ee } from '../../helpers/event-emitter';
import { getAuthElms } from './auth-dom-elements';
import { userLogin, userRegister } from '../../service/api-service';
import { alertHandle } from '../../alerts/alerts-handler';
import { validateForm } from '../../helpers/form-validation';

const getLoginFormSubmitHandler = (authElms) => async (e) => {
    e.preventDefault();

    const email = authElms.loginEmailInput.value;
    const password = authElms.loginPasswordInput.value;

    try {
        const { accessToken, user } = await userLogin(email, password);

        ee.emit('auth/user-logged-in', { accessToken, user });
    } catch (error) {
        alertHandle(error.message, 'error');
    }
};

const getRegisterFormSubmitHandler = (authElms) => async (e) => {
    e.preventDefault();

    if (!validateForm(authElms.registerFormElm)) {
        return;
    }

    const username = authElms.registerUsernameInput.value.trim();
    const email = authElms.registerEmailInput.value;
    const password = authElms.registerPasswordInput.value;

    try {
        const { accessToken, user } = await userRegister(
            username,
            email,
            password
        );

        ee.emit('auth/user-logged-in', { accessToken, user });
    } catch (error) {
        alertHandle(error.message, 'error');
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

    const registerFormInputs =
        authElms.registerFormElm.querySelectorAll('input');

    for (const input of registerFormInputs) {
        input.addEventListener('input', formInputErrorClearHandler);
    }

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

    authElms.registerFormElm.addEventListener(
        'submit',
        getRegisterFormSubmitHandler(authElms)
    );
};
