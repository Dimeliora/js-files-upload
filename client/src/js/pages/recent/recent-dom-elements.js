export const getRecentElms = (rootElement) => ({
    recentListElm: rootElement.querySelector('[data-recent-list]'),
    recentViewAllElm: rootElement.querySelector('[data-view-all]'),
    recentLogoutElm: rootElement.querySelector('[data-recent-logout]'),
});
