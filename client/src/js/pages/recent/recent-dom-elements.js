export const getRecentElms = (rootElement) => ({
    recentBlockElm: rootElement.querySelector('[data-recent-block]'),
    recentContentElm: rootElement.querySelector('[data-recent-content]'),
});

export const getRecentContentElms = (contentElm) => ({
    recentListElm: contentElm.querySelector('[data-recent-list]'),
    recentViewAllElm: contentElm.querySelector('[data-view-all]'),
});
