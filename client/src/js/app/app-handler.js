import authState from '../state/auth-state';
import appState from '../state/app-state';
import recentState from '../state/recent-state';
import { ee } from '../helpers/event-emitter';
import { routes } from './routes';
import { appElms } from '../app/app-dom-elements';
import { createSpinnerHTML } from '../components/loader/loader-template-creators';
import { notFoundHandler } from '../pages/not-found/not-found-handler';
import { userAuth } from '../services/auth-service';
import { getUserData, getUserAvatarImage } from '../services/user-service';

const checkUserAuthStatusHandler = async () => {
    try {
        const { accessToken, user } = await userAuth();

        setAuthAndUserData(accessToken, user);

        await requestAndSetUserAvatarImage();
    } catch (error) {
        localStorage.removeItem('access-token');
    } finally {
        routesHandler();
    }
};

const setAuthAndUserData = (accessToken, user) => {
    localStorage.setItem('access-token', accessToken);

    authState.setAuthState();
    appState.setInitialAppData(user);
};

const requestAndSetUserAvatarImage = async () => {
    try {
        const avatarImageBlob = await getUserAvatarImage();

        appState.setUserAvatarUrl(URL.createObjectURL(avatarImageBlob));

        ee.emit('app/avatar-url-changed');
    } catch (error) {
        appState.setUserAvatarUrl(null);
    }
};

const routesHandler = () => {
    let path = window.location.hash.slice(1) || '/';
    if (!authState.isAuth) {
        path = 'auth';
    }

    const routeHandler = routes[path] ?? notFoundHandler;

    routeHandler(appElms.appContainer);
};

const userLoginHandler = async ({ accessToken, user }) => {
    setAuthAndUserData(accessToken, user);

    await requestAndSetUserAvatarImage();

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

const appHandler = () => {
    appElms.appContainer.innerHTML = createSpinnerHTML();

    checkUserAuthStatusHandler();

    window.addEventListener('hashchange', routesHandler);

    ee.on('auth/user-logged-in', userLoginHandler);

    ee.on('auth/user-logged-out', userLogoutHandler);

    ee.on('upload/resync-needed', syncAppHandler);

    ee.on('recent/resync-needed', syncAppHandler);

    ee.on('service/fetch-error', syncErrorHandler);

    ee.on('dashboard/avatar-uploaded', requestAndSetUserAvatarImage);
};

appHandler();
