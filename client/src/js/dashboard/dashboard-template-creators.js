export const createDashboardHTML = () => {
    return `
        <div class="dashboard paper">
            <div class="dashboard__header">
                <div class="dashboard__user">
                    <div class="dashboard__avatar">
                        <img
                            src="/images/user-avatar.webp"
                            alt="User avatar image"
                            class="dashboard__avatar-image"
                        />
                    </div>
                    <div class="dashboard__user-info">
                        <div class="dashboard__username">Laura Eddy</div>
                        <div class="dashboard__email">
                            info@lauraeddy.com.au
                        </div>
                    </div>
                </div>
                <a
                    href="#new-upload"
                    class="dashboard__link home-link home-link--active"
                    title="Upload file"
                    aria-label="Upload file"
                >
                    <svg class="home-link__icon">
                        <use href="/icons/icon-sprite.svg#upload" />
                    </svg>
                </a>
            </div>
            <div class="dashboard__storage">
                <h2 class="dashboard__storage-heading">Storage</h2>
                <div class="dashboard__storage-capacity">84Gb of 120Gb</div>
                <div class="dashboard__storage-bar progress">
                    <div class="progress__filler" style="width: 80%"></div>
                </div>
            </div>
            <div class="dashboard__plan">
                <button class="dashboard__upgrade button">
                    Upgrade Plan
                </button>
                <div class="dashboard__plan-notice">
                    10% off plans this month
                </div>
            </div>
            <div class="dashboard__settings">
                <div class="dashboard__settings-item setting">
                    <div class="setting__info">
                        <div class="setting__title">Storage location</div>
                        <div class="setting__value">
                            /Laura/My Documents
                        </div>
                    </div>
                    <button
                        class="setting__action button button--secondary"
                    >
                        Change
                    </button>
                </div>
                <div class="dashboard__settings-item setting">
                    <div class="setting__info">
                        <div class="setting__title">Notifications</div>
                        <div class="setting__value">
                            All notifications enabled
                        </div>
                    </div>
                    <button
                        class="setting__action button button--secondary"
                    >
                        Change
                    </button>
                </div>
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
