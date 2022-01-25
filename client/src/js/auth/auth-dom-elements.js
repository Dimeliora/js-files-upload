export const getAuthElms = (rootElement) => ({
    loginFormElm: rootElement.querySelector('[data-login-form]'),
    loginFormSwitchElm: rootElement.querySelector('[data-login-switch]'),
    loginEmailInput: rootElement.querySelector('[data-login-email]'),
    loginPasswordInput: rootElement.querySelector('[data-login-password]'),
    registerFormElm: rootElement.querySelector('[data-register-form]'),
    registerFormSwitchElm: rootElement.querySelector('[data-register-switch]'),
});
