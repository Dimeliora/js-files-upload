export const getRecentElms = (rootElement) => ({
    recentContentElm: rootElement.querySelector('[data-recent-content]'),
    recentLogoutElm: rootElement.querySelector('[data-recent-logout]'),
});

export const getRecentContentElms = (contentElm) => ({
    recentListElm: contentElm.querySelector('[data-recent-list]'),
    recentViewAllElm: contentElm.querySelector('[data-view-all]'),
});
