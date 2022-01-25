let isFormTransitionInProgress = false;

export const getSignInFormSwitchHandler = (authElms) => () => {
    authElms.signUpFormElm.classList.add('auth__forms-item--hidden');
    isFormTransitionInProgress = true;
};

export const getSignUpFormSwitchHandler = (authElms) => () => {
    authElms.signInFormElm.classList.add('auth__forms-item--hidden');
    isFormTransitionInProgress = true;
};

export const getSignInFormTransitionHandler = (authElms) => (e) => {
    if (e.target === authElms.signInFormElm && isFormTransitionInProgress) {
        authElms.signUpFormElm.classList.remove('auth__forms-item--hidden');
        isFormTransitionInProgress = false;
    }
};

export const getSignUpFormTransitionHandler = (authElms) => (e) => {
    if (e.target === authElms.signUpFormElm && isFormTransitionInProgress) {
        authElms.signInFormElm.classList.remove('auth__forms-item--hidden');
        isFormTransitionInProgress = false;
    }
};
