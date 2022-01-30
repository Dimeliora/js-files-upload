import { ee } from '../../helpers/event-emitter';
import appState from '../../state/app-state';
import avatarFileTypes from './dashboard-avatar-file-types';
import { getDashboardElms } from './dashboard-dom-elements';
import {
    USER_AVATAR_FALLBACK_IMAGE,
    createDashboardHTML,
} from './dashboard-template-creators';
import { userStorageInfoUpdate } from './dashboard-view-updates';
import { footerHandler } from '../../components/footer/footer-handler';
import { alertHandle } from '../../components/alerts/alerts-handler';
import { uploadUserAvatarImage } from '../../services/user-service';

const setAvatarImage = (avatarImageElm, url) => {
    if (url) {
        avatarImageElm.src = url;
    } else {
        avatarImageElm.src = USER_AVATAR_FALLBACK_IMAGE;
    }
};

const getAvatarChangeClickHandler = (dashboardElms) => () => {
    dashboardElms.dashboardAvatarFileElm.click();
};

const getAvatarChangeKeyDownHandler = (dashboardElms) => (e) => {
    if (e.key === 'Enter') {
        dashboardElms.dashboardAvatarFileElm.click();
    }
};

const avatarFileChangeHandler = async ({ target }) => {
    if (target.files.length === 0) {
        return;
    }

    const [file] = target.files;
    if (!avatarFileTypes[file.type]) {
        alertHandle('Avatar must be a file of type JPEG, PNG or WebP', 'error');
        return;
    }

    try {
        await uploadUserAvatarImage(file);

        ee.emit('dashboard/avatar-uploaded');
    } catch (error) {
        alertHandle(error.message, 'error');
    }
};

const getUpdateAvatarImageHandler = (avatarImageElm) => () => {
    setAvatarImage(avatarImageElm, appState.avatarImageUrl);
};

export const dashboardHandler = (appContainer) => {
    appContainer.innerHTML = createDashboardHTML(
        appState.username,
        appState.email
    );

    const dashboardElms = getDashboardElms(appContainer);

    footerHandler(dashboardElms.dashboardBlockElm);

    setAvatarImage(
        dashboardElms.dashboardAvatarImageElm,
        appState.avatarImageUrl
    );

    userStorageInfoUpdate(
        dashboardElms,
        appState.totalDiskSpace,
        appState.usedDiskSpace
    );

    dashboardElms.dashboardAvatarElm.addEventListener(
        'click',
        getAvatarChangeClickHandler(dashboardElms)
    );

    dashboardElms.dashboardAvatarElm.addEventListener(
        'keyup',
        getAvatarChangeKeyDownHandler(dashboardElms)
    );

    dashboardElms.dashboardAvatarFileElm.addEventListener(
        'change',
        avatarFileChangeHandler
    );

    ee.on(
        'app/avatar-url-changed',
        getUpdateAvatarImageHandler(dashboardElms.dashboardAvatarImageElm),
        'dashboard:app/avatar-url-changed'
    );
};
