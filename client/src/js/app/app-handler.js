import { routes } from './routes';
import { appElms } from '../app/app-dom-elements';

const router = () => {
    const path = window.location.hash.slice(1) || '/';
    const routeHandler = routes[path];

    routeHandler(appElms.appContainer);
};

window.addEventListener('load', router);

window.addEventListener('hashchange', router);
