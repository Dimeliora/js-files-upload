let isFormTransitionInProgress = false;

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
