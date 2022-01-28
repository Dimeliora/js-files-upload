import { ee } from '../../helpers/event-emitter';
import { getRecentElms } from './recent-dom-elements';
import {
    createRecentHTML,
    createRecentFileHTML,
    createRecentPlaceholderHTML,
} from './recent-template-creators';
import { getFiles } from '../../services/file-service';

const getFilesAndCreateListMarkup = async (max = 0) => {
    try {
        const files = await getFiles(max);
        const recentListMarkup = files
            .map((file) => createRecentFileHTML(file))
            .join(' ');

        return recentListMarkup;
    } catch (error) {
        return createRecentPlaceholderHTML('error');
    }
};

const logoutHandler = () => {
    ee.emit('auth/user-logged-out');
};

export const recentHandler = async (appContainer) => {
    appContainer.innerHTML = createRecentHTML();

    const recentElms = getRecentElms(appContainer);

    const recentListMarkup = await getFilesAndCreateListMarkup(5);
    recentElms.recentListElm.innerHTML = recentListMarkup;

    recentElms.recentLogoutElm.addEventListener('click', logoutHandler);
};
