export const createLoginFormHTML = () => {
    return `
        <form
            class="auth__forms-item auth-form"
            novalidate
            data-sign-in-form
        >
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#email" />
                </svg>
                <label class="text-field__label" for="sign-in-email"
                    >Email</label
                >
                <input
                    class="text-field__input"
                    type="text"
                    name="sign-in-email"
                    id="sign-in-email"
                    placeholder="Enter Email"
                    data-sign-in-email
                />
            </div>
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#key" />
                </svg>
                <label
                    class="text-field__label"
                    for="sign-in-password"
                    >Password</label
                >
                <input
                    class="text-field__input"
                    type="password"
                    name="sign-in-password"
                    id="sign-in-password"
                    placeholder="Enter Password"
                    data-sign-in-password
                />
            </div>
            <div class="auth-form__controls">
                <button class="auth-form__submit button" type="submit">
                    Login
                </button>
                <button
                    class="auth-form__switch-form"
                    type="button"
                    data-sign-up-switch
                >
                    Don't have an account?
                </button>
            </div>
        </form>
    `;
};

export const createRegisterFormHTML = () => {
    return `
        <form
            class="auth__forms-item auth__forms-item--hidden auth-form"
            novalidate
            data-sign-up-form
        >
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#person" />
                </svg>
                <label
                    class="text-field__label"
                    for="sign-up-username"
                    >Name</label
                >
                <input
                    class="text-field__input"
                    type="text"
                    name="sign-up-username"
                    id="sign-up-username"
                    placeholder="Enter Name"
                    data-sign-up-username
                />
            </div>
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#email" />
                </svg>
                <label class="text-field__label" for="sign-up-email"
                    >Email</label
                >
                <input
                    class="text-field__input"
                    type="text"
                    name="sign-up-email"
                    id="sign-up-email"
                    placeholder="Enter Email"
                    data-sign-up-email
                />
            </div>
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#key" />
                </svg>
                <label
                    class="text-field__label"
                    for="sign-up-password"
                    >Password</label
                >
                <input
                    class="text-field__input"
                    type="password"
                    name="sign-up-password"
                    id="sign-up-password"
                    placeholder="Enter Password"
                    data-sign-up-password
                />
            </div>
            <div class="auth-form__controls">
                <button
                    class="auth-form__submit button"
                    type="submit"
                >
                    Register
                </button>
                <button
                    class="auth-form__switch-form"
                    type="button"
                    data-sign-in-switch
                >
                    Have already an account?
                </button>
            </div>
        </form>
    `;
};

export const createAuthHTML = () => {
    return `
        <div class="auth">
            <h2 class="auth__heading">Welcome to JS Files Upload App</h2>
            <div class="auth__subheading">
                Please, sign in to continue
            </div>
            <div class="auth__forms" data-auth-forms></div>
        </div>
    `;
};
