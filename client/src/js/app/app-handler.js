import state from '../state/state';
import { routes } from './routes';
import { appElms } from '../app/app-dom-elements';
import { userAuth } from '../service/api-service';
import { ee } from '../helpers/event-emitter';

const setAuthState = (accessToken, user) => {
    localStorage.setItem('access-token', accessToken);

    state.setAuthState(user);
};

const checkUserAuthStatus = async () => {
    try {
        const { accessToken, user } = await userAuth();

        setAuthState(accessToken, user);
    } catch (error) {
        localStorage.removeItem('access-token');
    } finally {
        router();
    }
};

const userLoginHandler = ({ accessToken, user }) => {
    setAuthState(accessToken, user);

    router();
};

const userLogoutHandler = () => {
    localStorage.removeItem('access-token');

    state.resetAuthState();

    router();
};

const router = () => {
    let path = window.location.hash.slice(1) || '/';
    if (!state.isAuth) {
        path = 'auth';
    }

    const routeHandler = routes[path];

    routeHandler(appElms.appContainer);
};

window.addEventListener('load', checkUserAuthStatus);

window.addEventListener('hashchange', router);

ee.on('auth/user-logged-in', userLoginHandler);

ee.on('auth/user-logged-out', userLogoutHandler);
