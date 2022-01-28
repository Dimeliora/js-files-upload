export const getFooterElms = (rootElement) => ({
    footerSyncElm: rootElement.querySelector('[data-footer-sync]'),
    footerLogoutElm: rootElement.querySelector('[data-footer-logout]'),
});
