export const getRecentElms = (rootElement) => ({
    recentBlockElm: rootElement.querySelector('[data-recent-block]'),
    recentListElm: rootElement.querySelector('[data-recent-list]'),
    recentLoadElm: rootElement.querySelector('[data-recent-load]'),
});
