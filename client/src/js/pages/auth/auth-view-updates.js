let isFormTransitionInProgress = false;

export const formInputErrorSet = (inputElm) => {
    inputElm.parentElement.classList.add('text-field--invalid');
};

export const formInputErrorClearHandler = ({ target }) => {
    target.parentElement.classList.remove('text-field--invalid');
};

export const getLoginFormSwitchHandler = (authElms) => () => {
    authElms.registerFormElm.classList.add('auth__forms-item--hidden');
    isFormTransitionInProgress = true;
};

export const getRegisterFormSwitchHandler = (authElms) => () => {
    authElms.loginFormElm.classList.add('auth__forms-item--hidden');
    isFormTransitionInProgress = true;
};

export const getLoginFormTransitionHandler = (authElms) => (e) => {
    if (e.target === authElms.loginFormElm && isFormTransitionInProgress) {
        authElms.registerFormElm.classList.remove('auth__forms-item--hidden');
        isFormTransitionInProgress = false;
    }
};

export const getRegisterFormTransitionHandler = (authElms) => (e) => {
    if (e.target === authElms.registerFormElm && isFormTransitionInProgress) {
        authElms.loginFormElm.classList.remove('auth__forms-item--hidden');
        isFormTransitionInProgress = false;
    }
};
