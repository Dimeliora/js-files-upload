export const createLoginFormHTML = () => {
    return `
        <form
            class="auth__forms-item auth-form"
            novalidate
            data-login-form
        >
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#email" />
                </svg>
                <label class="text-field__label" for="login-email"
                    >Email</label
                >
                <input
                    class="text-field__input"
                    type="text"
                    name="login-email"
                    id="login-email"
                    placeholder="Enter Email"
                    data-login-email
                />
            </div>
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#key" />
                </svg>
                <label
                    class="text-field__label"
                    for="login-password"
                    >Password</label
                >
                <input
                    class="text-field__input"
                    type="password"
                    name="login-password"
                    id="login-password"
                    placeholder="Enter Password"
                    data-login-password
                />
            </div>
            <div class="auth-form__controls">
                <button class="auth-form__submit button" type="submit">
                    Login
                </button>
                <button
                    class="auth-form__switch-form"
                    type="button"
                    data-register-switch
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
            data-register-form
        >
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#person" />
                </svg>
                <label
                    class="text-field__label"
                    for="register-username"
                    >Name</label
                >
                <input
                    class="text-field__input"
                    type="text"
                    name="register-username"
                    id="register-username"
                    placeholder="Enter Name"
                    data-register-username
                />
            </div>
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#email" />
                </svg>
                <label class="text-field__label" for="register-email"
                    >Email</label
                >
                <input
                    class="text-field__input"
                    type="text"
                    name="register-email"
                    id="register-email"
                    placeholder="Enter Email"
                    data-register-email
                />
            </div>
            <div class="auth-form__field text-field">
                <svg class="text-field__icon">
                    <use href="/icons/icon-sprite.svg#key" />
                </svg>
                <label
                    class="text-field__label"
                    for="register-password"
                    >Password</label
                >
                <input
                    class="text-field__input"
                    type="password"
                    name="register-password"
                    id="register-password"
                    placeholder="Enter Password"
                    data-register-password
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
                    data-login-switch
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
