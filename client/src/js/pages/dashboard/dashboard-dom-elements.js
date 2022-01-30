export const getDashboardElms = (rootElement) => ({
    dashboardBlockElm: rootElement.querySelector('[data-dashboard-block]'),
    dashboardAvatarElm: rootElement.querySelector('[data-dashboard-avatar]'),
    dashboardAvatarImageElm: rootElement.querySelector(
        '[data-dashboard-avatar-image]'
    ),
    dashboardAvatarFileElm: rootElement.querySelector(
        '[data-dashboard-avatar-file]'
    ),
    dashboardStorageElm: rootElement.querySelector('[data-dashboard-storage]'),
    dashboardProgressElm: rootElement.querySelector(
        '[data-dashboard-progress]'
    ),
});
