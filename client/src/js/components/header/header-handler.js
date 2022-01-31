import {
    createHeaderDOMElement,
    updateHeaderLinkActiveClass,
} from './header-view-updates';
import { getHeaderElms } from './header-dom-elements';

export const headerHandler = (container) => {
    const headerElement = createHeaderDOMElement();

    container.prepend(headerElement);

    const headerElms = getHeaderElms(headerElement);

    updateHeaderLinkActiveClass(
        window.location.hash,
        headerElms.headerNavLinkElms
    );
};
