import { ee } from '../../helpers/event-emitter';
import { validateForm } from '../../helpers/form-validation';
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
    deactivateAuthForm,
    activateAuthForm,
} from './auth-view-updates';
import {
    getAuthFormsContainerElm,
    getAuthElms,
    getRegisterFormInputElms,
} from './auth-dom-elements';
import { alertHandle } from '../../components/alerts/alerts-handler';
import { userLogin, userRegister } from '../../services/auth-service';

const getLoginFormSubmitHandler = (authElms) => async (e) => {
    e.preventDefault();

    const email = authElms.loginEmailInput.value;
    const password = authElms.loginPasswordInput.value;

    deactivateAuthForm(authElms.loginFormElm);

    try {
        const { accessToken, user } = await userLogin(email, password);

        ee.emit('auth/user-logged-in', { accessToken, user });
    } catch (error) {
        alertHandle(error.message, 'error');

        activateAuthForm(authElms.loginFormElm);
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

    deactivateAuthForm(authElms.registerFormElm);

    try {
        const { accessToken, user } = await userRegister(
            username,
            email,
            password
        );

        ee.emit('auth/user-logged-in', { accessToken, user });
    } catch (error) {
        alertHandle(error.message, 'error');

        activateAuthForm(authElms.registerFormElm);
    }
};

export const authHandler = (appContainer) => {
    appContainer.innerHTML = createAuthHTML();

    const authFormsContainerElm = getAuthFormsContainerElm(appContainer);

    authFormsContainerElm.insertAdjacentHTML(
        'beforeend',
        createLoginFormHTML()
    );
    authFormsContainerElm.insertAdjacentHTML(
        'beforeend',
        createRegisterFormHTML()
    );

    const authElms = getAuthElms(authFormsContainerElm);

    const registerFormInputs = getRegisterFormInputElms(
        authElms.registerFormElm
    );
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
