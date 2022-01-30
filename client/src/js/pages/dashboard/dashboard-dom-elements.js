export const getDashboardElms = (rootElement) => ({
    dashboardBlockElm: rootElement.querySelector('[data-dashboard-block]'),
    dashboardAvatarElm: rootElement.querySelector('[data-dashboard-avatar]'),
    dashboardAvatarFileElm: rootElement.querySelector(
        '[data-dashboard-avatar-file]'
    ),
    dashboardStorageElm: rootElement.querySelector('[data-dashboard-storage]'),
    dashboardProgressElm: rootElement.querySelector(
        '[data-dashboard-progress]'
    ),
});
