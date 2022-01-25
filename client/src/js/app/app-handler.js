import state from '../state/state';
import { routes } from './routes';
import { appElms } from '../app/app-dom-elements';
import { userAuth } from '../service/fetch-data';

const checkUserAuthStatus = async () => {
    try {
        const { accessToken, user } = await userAuth();

        localStorage.setItem('access-token', accessToken);

        state.setAuthState(user);
    } catch (error) {
        localStorage.removeItem('access-token');
    } finally {
        router();
    }
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
