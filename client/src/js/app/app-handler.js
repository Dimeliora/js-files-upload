import authState from '../state/auth-state';
import appState from '../state/app-state';
import { routes } from './routes';
import { appElms } from '../app/app-dom-elements';
import { userAuth } from '../services/auth-service';
import { ee } from '../helpers/event-emitter';

const setAuthState = (accessToken, user) => {
    localStorage.setItem('access-token', accessToken);

    authState.setAuthState(user);
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

    authState.resetAuthState();

    window.location.hash = '';
    routesHandler();
};

const setSyncNeededHandler = () => {
    appState.setSyncNeed();
};

const routesHandler = () => {
    let path = window.location.hash.slice(1) || '/';
    if (!authState.isAuth) {
        path = 'auth';
    }

    const routeHandler = routes[path];

    routeHandler(appElms.appContainer);
};

window.addEventListener('load', checkUserAuthStatusHandler);

window.addEventListener('hashchange', routesHandler);

ee.on('auth/user-logged-in', userLoginHandler);

ee.on('auth/user-logged-out', userLogoutHandler);

ee.on('upload/sync-needed', setSyncNeededHandler);
