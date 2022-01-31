export const getAuthFormsContainerElm = (rootElement) =>
    rootElement.querySelector('[data-auth-forms]');

export const getAuthElms = (authFormsElm) => ({
    loginFormElm: authFormsElm.querySelector('[data-login-form]'),
    loginFormSwitchElm: authFormsElm.querySelector('[data-login-switch]'),
    loginEmailInput: authFormsElm.querySelector('[data-login-email]'),
    loginPasswordInput: authFormsElm.querySelector('[data-login-password]'),
    registerFormElm: authFormsElm.querySelector('[data-register-form]'),
    registerFormSwitchElm: authFormsElm.querySelector('[data-register-switch]'),
    registerUsernameInput: authFormsElm.querySelector(
        '[data-register-username]'
    ),
    registerEmailInput: authFormsElm.querySelector('[data-register-email]'),
    registerPasswordInput: authFormsElm.querySelector(
        '[data-register-password]'
    ),
});

export const getRegisterFormInputElms = (registerFormElm) =>
    registerFormElm.querySelectorAll('input');
