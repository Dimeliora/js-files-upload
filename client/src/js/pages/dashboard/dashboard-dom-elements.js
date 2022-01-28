export const getDashboardElms = (rootElement) => ({
    dashboardBlockElm: rootElement.querySelector('[data-dashboard-block]'),
    dashboardStorageElm: rootElement.querySelector('[data-dashboard-storage]'),
    dashboardProgressElm: rootElement.querySelector(
        '[data-dashboard-progress]'
    ),
});
