export const createRecentHTML = () => {
    return `
        <div class="recent paper">
            <div class="upload__header header">
                <nav class="header__navigation">
                    <a href="#upload" class="header__link"
                        >New Upload</a
                    >
                    <a
                        href="#recent"
                        class="header__link header__link--active"
                        >Recent</a
                    >
                </nav>
                <a
                    href="#"
                    class="header__home home-link"
                    title="Dashboard"
                    aria-label="Dashboard"
                >
                    <svg class="home-link__icon">
                        <use href="/icons/icon-sprite.svg#settings" />
                    </svg>
                </a>
            </div>
            <ul class="recent__list" data-recent-list></ul>
            <div class="recent__view-all">
                <button
                    class="recent__view-all-button button button--secondary"
                    data-view-all
                >
                    View all uploads
                </button>
            </div>
            <div class="dashboard__footer footer">
                <div class="footer__sync">
                    <svg class="footer__sync-icon">
                        <use href="/icons/icon-sprite.svg#tick" />
                    </svg>
                    <div class="footer__sync">Last synced: 3 mins ago</div>
                </div>
                <button 
                    class="footer__logout icon-button"
                    title="Logout"
                    aria-label="Logout"
                    data-recent-logout
                >
                    <svg class="icon-button__icon">
                        <use href="/icons/icon-sprite.svg#sign-out" />
                    </svg>
                </button>
            </div>
        </div>
    `;
};

export const createRecentFileHTML = () => {
    return `
        <li class="recent__list-item file">
            <svg class="file__icon">
                <use href="/icons/icon-sprite.svg#pdf-file" />
            </svg>
            <div class="file__info">
                <div class="file__name">user-journey-01.pdf</div>
                <div class="file__upload-time">2m ago</div>
            </div>
            <div class="file__size">604KB</div>
            <button
                class="file__controls icon-button"
                title="File actions"
                aria-label="File actions"
                data-file-actions
            >
                <svg class="icon-button__icon">
                    <use href="/icons/icon-sprite.svg#more" />
                </svg>
            </button>
        </li>
    `;
};

export const createRecentPlaceholderHTML = (reason = 'error') => {
    let placeholderText = 'No files to show';
    if (reason === 'error') {
        placeholderText = 'Error occured during files list fetch';
    }

    return `
        <li class="recent__list-item recent__list-item--placeholder">${placeholderText}</li>
    `;
};
