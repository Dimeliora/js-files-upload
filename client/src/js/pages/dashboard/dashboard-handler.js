import appState from '../../state/app-state';
import avatarFileTypes from './dashboard-avatar-file-types';
import { ee } from '../../helpers/event-emitter';
import {
    USER_AVATAR_FALLBACK_IMAGE,
    createDashboardHTML,
} from './dashboard-template-creators';
import {
    userStorageInfoUpdate,
    showAvatarSpinner,
    hideAvatarSpinner,
} from './dashboard-view-updates';
import { getDashboardElms } from './dashboard-dom-elements';
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

const getAvatarFileChangeHandler = (dashboardElms) => async (e) => {
    if (e.target.files.length === 0) {
        return;
    }

    const [file] = e.target.files;
    if (!avatarFileTypes[file.type]) {
        alertHandle('Avatar must be a file of type JPEG, PNG or WebP', 'error');
        return;
    }

    showAvatarSpinner(dashboardElms.dashboardAvatarElm);

    try {
        await uploadUserAvatarImage(file);

        ee.emit('dashboard/avatar-uploaded');
    } catch (error) {
        alertHandle(error.message, 'error');

        hideAvatarSpinner(dashboardElms.dashboardAvatarElm);
    }
};

const getUpdateAvatarImageHandler = (dashboardElms) => () => {
    const { dashboardAvatarElm, dashboardAvatarImageElm } = dashboardElms;

    setAvatarImage(dashboardAvatarImageElm, appState.avatarImageUrl);

    hideAvatarSpinner(dashboardAvatarElm);
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
        getAvatarFileChangeHandler(dashboardElms)
    );

    ee.on(
        'app/avatar-url-changed',
        getUpdateAvatarImageHandler(dashboardElms),
        'dashboard:app/avatar-url-changed'
    );
};
