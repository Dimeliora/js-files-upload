export const getAuthElms = (rootElement) => ({
    loginFormElm: rootElement.querySelector('[data-login-form]'),
    registerFormElm: rootElement.querySelector('[data-register-form]'),
    loginFormSwitchElm: rootElement.querySelector('[data-login-switch]'),
    registerFormSwitchElm: rootElement.querySelector('[data-register-switch]'),
});
