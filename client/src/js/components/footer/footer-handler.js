import { ee } from '../../helpers/event-emitter';
import { createFooterHTML } from './footer-template-creators';
import { getFooterElms } from './footer-dom-elements.js';

const getFooterDOMElement = () => {
    const rootElm = document.createElement('footer');
    rootElm.classList.add('footer');

    rootElm.insertAdjacentHTML('afterbegin', createFooterHTML());

    return rootElm;
};

const logoutHandler = () => {
    ee.emit('auth/user-logged-out');
};

export const footerHandler = (container) => {
    const footerElement = getFooterDOMElement();

    container.append(footerElement);

    const footerElms = getFooterElms(footerElement);

    footerElms.footerLogoutElm.addEventListener('click', logoutHandler);
};
