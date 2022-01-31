export const getFooterElms = (footerElement) => ({
    footerSyncElm: footerElement.querySelector('[data-footer-sync]'),
    footerLogoutElm: footerElement.querySelector('[data-footer-logout]'),
});
