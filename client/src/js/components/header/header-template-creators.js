export const createHeaderHTML = () => {
    return `
        <nav class="header__navigation">
            <a href="#upload" class="header__link" data-header-link>
                New Upload
            </a>
            <a href="#recent" class="header__link" data-header-link>
                Recent
            </a>
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
    `;
};
