export const getAuthElms = (rootElement) => ({
    signInFormElm: rootElement.querySelector('[data-sign-in-form]'),
    signUpFormElm: rootElement.querySelector('[data-sign-up-form]'),
    signInFormSwitchElm: rootElement.querySelector('[data-sign-in-switch]'),
    signUpFormSwitchElm: rootElement.querySelector('[data-sign-up-switch]'),
});
