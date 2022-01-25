import { ee } from '../../helpers/event-emitter';
import { getRecentElms } from './recent-dom-elements';
import { createRecentHTML } from './recent-template-creators';

const logoutHandler = () => {
    ee.emit('auth/user-logged-out');
};

export const recentHandler = (appContainer) => {
    appContainer.innerHTML = createRecentHTML();

    const recentElms = getRecentElms(appContainer);

    recentElms.recentLogoutElm.addEventListener('click', logoutHandler);
};
