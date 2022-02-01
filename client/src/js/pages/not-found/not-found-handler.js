import { createNotFoundHTML } from './not-found-template.creators';
import { getNotFoundElms } from './not-found-dom-elements';

const notFoundBackClickHandler = () => {
    window.location.hash = '';
};

export const notFoundHandler = (appContainer) => {
    appContainer.innerHTML = createNotFoundHTML();

    const { notFoundBackElm } = getNotFoundElms(appContainer);

    notFoundBackElm.addEventListener('click', notFoundBackClickHandler);
};
