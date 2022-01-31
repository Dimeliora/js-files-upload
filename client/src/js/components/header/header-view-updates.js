import { createHeaderHTML } from './header-template-creators';

export const createHeaderDOMElement = () => {
    const rootElm = document.createElement('header');
    rootElm.classList.add('header');

    rootElm.insertAdjacentHTML('afterbegin', createHeaderHTML());

    return rootElm;
};

export const updateHeaderLinkActiveClass = (path, links) => {
    for (const link of links) {
        if (link.hash === path) {
            link.classList.add('header__link--active');
        }
    }
};
