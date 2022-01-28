export const updateHeaderLinkActiveClass = (path, links) => {
    for (const link of links) {
        if (link.hash === path) {
            link.classList.add('header__link--active');
        }
    }
};
