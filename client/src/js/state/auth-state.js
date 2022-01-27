class AuthState {
    isAuth = false;
    user = null;

    setAuthState(user) {
        this.isAuth = true;
        this.user = user;
    }

    resetAuthState() {
        this.isAuth = false;
        this.user = null;
    }
}

export default new AuthState();
