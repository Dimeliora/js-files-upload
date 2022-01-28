import { createHeaderHTML } from './header-template-creators';
import { getHeaderElms } from './header-dom-elements';
import { updateHeaderLinkActiveClass } from './header-view-updates';

const getHeaderDOMElement = () => {
    const rootElm = document.createElement('header');
    rootElm.classList.add('header');

    rootElm.insertAdjacentHTML('afterbegin', createHeaderHTML());

    return rootElm;
};

export const headerHandler = (container) => {
    const headerElement = getHeaderDOMElement();

    container.prepend(headerElement);

    const headerElms = getHeaderElms(headerElement);

    updateHeaderLinkActiveClass(
        window.location.hash,
        headerElms.headerNavLinkElms
    );
};
