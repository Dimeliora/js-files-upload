import { formInputErrorSet } from '../pages/auth/auth-view-updates';

const VALIDATION_CRITERIAS = {
    email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
    minLength: /^.{6,}$/,
    notEmpty: /.{1,}/,
};

const validateTextField = (fieldElm) => {
    const validationCriteria = fieldElm.dataset.validate;

    let value = fieldElm.value;
    if (fieldElm.type !== 'password') {
        value = fieldElm.value.trim();
    }

    if (!VALIDATION_CRITERIAS[validationCriteria]) {
        return true;
    }

    return VALIDATION_CRITERIAS[validationCriteria].test(value);
};

export const validateForm = (formElement) => {
    let isFormValid = true;

    const inputElms = formElement.querySelectorAll('input');

    for (const input of inputElms) {
        if (!validateTextField(input)) {
            isFormValid = false;
            formInputErrorSet(input);
        }
    }

    return isFormValid;
};
