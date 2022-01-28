export const createFooterHTML = () => {
    return `
        <div class="footer__sync">
            <svg class="footer__sync-icon">
                <use href="/icons/icon-sprite.svg#tick" />
            </svg>
            <div class="footer__sync" data-footer-sync>
                Last synced: 3 mins ago
            </div>
        </div>
        <button 
            class="footer__logout icon-button"
            title="Logout"
            aria-label="Logout"
            data-footer-logout
        >
            <svg class="icon-button__icon">
                <use href="/icons/icon-sprite.svg#sign-out" />
            </svg>
        </button>
    `;
};
