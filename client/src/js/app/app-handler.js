import authState from '../state/auth-state';
import appState from '../state/app-state';
import recentState from '../state/recent-state';
import { routes } from './routes';
import { appElms } from '../app/app-dom-elements';
import { userAuth } from '../services/auth-service';
import { ee } from '../helpers/event-emitter';
import { getUserData } from '../services/user-service';

const setAuthAndUserData = (accessToken, user) => {
    localStorage.setItem('access-token', accessToken);

    authState.setAuthState();
    appState.setInitialAppData(user);
};

const checkUserAuthStatusHandler = async () => {
    try {
        const { accessToken, user } = await userAuth();

        setAuthAndUserData(accessToken, user);
    } catch (error) {
        localStorage.removeItem('access-token');
    } finally {
        routesHandler();
    }
};

const userLoginHandler = ({ accessToken, user }) => {
    setAuthAndUserData(accessToken, user);

    routesHandler();
};

const userLogoutHandler = () => {
    localStorage.removeItem('access-token');

    authState.resetAuthState();
    appState.resetAppState();
    recentState.resetRecentState();

    window.location.hash = '';

    routesHandler();
};

const syncAppHandler = async () => {
    try {
        const userData = await getUserData();

        appState.updateAppData(userData);

        ee.emit('app/update-sync-status');
    } catch (error) {
        syncErrorHandler(error.message);
    }
};

const syncErrorHandler = (errorMessage) => {
    appState.setSyncError(errorMessage);

    ee.emit('app/update-sync-status');
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

ee.on('upload/resync-needed', syncAppHandler);

ee.on('recent/resync-needed', syncAppHandler);

ee.on('service/fetch-error', syncErrorHandler);
