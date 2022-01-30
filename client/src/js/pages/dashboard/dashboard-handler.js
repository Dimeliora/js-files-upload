import appState from '../../state/app-state';
import avatarFileTypes from './dashboard-avatar-file-types';
import { getDashboardElms } from './dashboard-dom-elements';
import { createDashboardHTML } from './dashboard-template-creators';
import { userStorageInfoUpdate } from './dashboard-view-updates';
import { footerHandler } from '../../components/footer/footer-handler';
import { alertHandle } from '../../components/alerts/alerts-handler';
import { uploadUserAvatarImage } from '../../services/user-service';

const getAvatarChangeClickHandler = (dashboardElms) => () => {
    dashboardElms.dashboardAvatarFileElm.click();
};

const getAvatarChangeKeyDownHandler = (dashboardElms) => (e) => {
    if (e.key === 'Enter') {
        dashboardElms.dashboardAvatarFileElm.click();
    }
};

const avatarFileChangeHandler = async ({ target }) => {
    const [file] = target.files;
    if (!avatarFileTypes[file.type]) {
        alertHandle(
            'Avatar file must be image of type JPEG, PNG or WebP',
            'error'
        );
        return;
    }

    await uploadUserAvatarImage(file);
    console.log('Avatar upload complete');
};

export const dashboardHandler = (appContainer) => {
    const { username, email, totalDiskSpace, usedDiskSpace } = appState;

    appContainer.innerHTML = createDashboardHTML(username, email);

    const dashboardElms = getDashboardElms(appContainer);

    footerHandler(dashboardElms.dashboardBlockElm);

    userStorageInfoUpdate(dashboardElms, totalDiskSpace, usedDiskSpace);

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
};
