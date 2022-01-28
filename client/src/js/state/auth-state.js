class AuthState {
    isAuth = false;

    setAuthState() {
        this.isAuth = true;
    }

    resetAuthState() {
        this.isAuth = false;
    }
}

export default new AuthState();
