import state from '../state/state';
import { routes } from './routes';
import { appElms } from '../app/app-dom-elements';
import { userAuth } from '../service/api-service';
import { ee } from '../helpers/event-emitter';

const setAuthState = (accessToken, user) => {
    localStorage.setItem('access-token', accessToken);

    state.setAuthState(user);
};

const checkUserAuthStatusHandler = async () => {
    try {
        const { accessToken, user } = await userAuth();

        setAuthState(accessToken, user);
    } catch (error) {
        localStorage.removeItem('access-token');
    } finally {
        routesHandler();
    }
};

const userLoginHandler = ({ accessToken, user }) => {
    setAuthState(accessToken, user);

    routesHandler();
};

const userLogoutHandler = () => {
    localStorage.removeItem('access-token');

    state.resetAuthState();

    window.location.hash = '';
    routesHandler();
};

const routesHandler = () => {
    let path = window.location.hash.slice(1) || '/';
    if (!state.isAuth) {
        path = 'auth';
    }

    const routeHandler = routes[path];

    routeHandler(appElms.appContainer);
};

window.addEventListener('load', checkUserAuthStatusHandler);

window.addEventListener('hashchange', routesHandler);

ee.on('auth/user-logged-in', userLoginHandler);

ee.on('auth/user-logged-out', userLogoutHandler);
