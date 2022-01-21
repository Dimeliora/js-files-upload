export const createRecentHTML = () => {
    return `
        <div class="recent paper">
            <div class="upload__header header">
                <nav class="header__navigation">
                    <a href="#new-upload" class="header__link"
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
            <ul class="recent__list">
                <li class="recent__list-item file">
                    <svg class="file__icon">
                        <use href="/icons/icon-sprite.svg#pdf-file" />
                    </svg>
                    <div class="file__info">
                        <div class="file__name">user-journey-01.pdf</div>
                        <div class="file__upload-time">2m ago</div>
                    </div>
                    <button
                        class="file__retry icon-button icon-button--danger"
                        title="Retry file upload"
                        aria-label="Retry file upload"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#retry" />
                        </svg>
                    </button>
                    <div class="file__size">604KB</div>
                    <button
                        class="file__controls icon-button"
                        title="File actions"
                        aria-label="File actions"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#more" />
                        </svg>
                    </button>
                </li>
                <li class="recent__list-item file">
                    <svg class="file__icon">
                        <use href="/icons/icon-sprite.svg#folder" />
                    </svg>
                    <div class="file__info">
                        <div class="file__name">Stock Photos</div>
                        <div class="file__upload-time">3m ago</div>
                    </div>
                    <button
                        class="file__retry icon-button icon-button--danger"
                        title="Retry file upload"
                        aria-label="Retry file upload"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#retry" />
                        </svg>
                    </button>
                    <div class="file__size">2.20GB</div>
                    <button
                        class="file__controls icon-button"
                        title="File actions"
                        aria-label="File actions"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#more" />
                        </svg>
                    </button>
                </li>
                <li class="recent__list-item file">
                    <svg class="file__icon">
                        <use href="/icons/icon-sprite.svg#folder" />
                    </svg>
                    <div class="file__info">
                        <div class="file__name">Optimised Photos</div>
                        <div class="file__upload-time">3 days ago</div>
                    </div>
                    <button
                        class="file__retry icon-button icon-button--danger"
                        title="Retry file upload"
                        aria-label="Retry file upload"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#retry" />
                        </svg>
                    </button>
                    <div class="file__size">1.46MB</div>
                    <button
                        class="file__controls icon-button"
                        title="File actions"
                        aria-label="File actions"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#more" />
                        </svg>
                    </button>
                </li>
                <li class="recent__list-item file">
                    <svg class="file__icon">
                        <use href="/icons/icon-sprite.svg#document-file" />
                    </svg>
                    <div class="file__info">
                        <div class="file__name">
                            Strategy-Pitch-Final.pptx
                        </div>
                        <div class="file__upload-time">3 days ago</div>
                    </div>
                    <button
                        class="file__retry file__retry--visible icon-button icon-button--danger"
                        title="Retry file upload"
                        aria-label="Retry file upload"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#retry" />
                        </svg>
                    </button>

                    <div class="file__size file__size--error">Error</div>
                    <button
                        class="file__controls icon-button"
                        title="File actions"
                        aria-label="File actions"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#more" />
                        </svg>
                    </button>
                </li>
                <li class="recent__list-item file">
                    <svg class="file__icon">
                        <use href="/icons/icon-sprite.svg#image-file" />
                    </svg>
                    <div class="file__info">
                        <div class="file__name">
                            man-holding-mobile-phone-while...
                        </div>
                        <div class="file__upload-time">7 days ago</div>
                    </div>
                    <button
                        class="file__retry icon-button icon-button--danger"
                        title="Retry file upload"
                        aria-label="Retry file upload"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#retry" />
                        </svg>
                    </button>

                    <div class="file__size">929KB</div>
                    <button
                        class="file__controls icon-button"
                        title="File actions"
                        aria-label="File actions"
                    >
                        <svg class="icon-button__icon">
                            <use href="/icons/icon-sprite.svg#more" />
                        </svg>
                    </button>
                </li>
            </ul>
            <div class="recent__view-all">
                <button
                    class="recent__view-all-button button button--secondary"
                >
                    View all uploads
                </button>
            </div>
            <div class="dashboard__footer footer">
                <svg class="footer__sync-icon">
                    <use href="/icons/icon-sprite.svg#tick" />
                </svg>
                <div class="footer__sync">Last synced: 3 mins ago</div>
            </div>
        </div>
    `;
};
