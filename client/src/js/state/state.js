class State {
    isAuth = null;
    user = null;

    setAuthState(user) {
        this.isAuth = true;
        this.user = user;
    }
}

export default new State();
