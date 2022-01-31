import { createFooterHTML } from './footer-template-creators';
import { getFormattedPassedTime } from '../../helpers/formatters';

export const createFooterDOMElement = () => {
    const rootElm = document.createElement('footer');
    rootElm.classList.add('footer');

    rootElm.insertAdjacentHTML('afterbegin', createFooterHTML());

    return rootElm;
};


export const updateSyncStatusElm = (syncElm, passedTime, syncError) => {
    if (syncError) {
        syncElm.parentElement.classList.add('footer__sync--error');
        syncElm.textContent = `Sync error: ${syncError}`;
    } else {
        syncElm.parentElement.classList.remove('footer__sync--error');
        syncElm.textContent = `Last synced: ${getFormattedPassedTime(
            new Date(passedTime)
        )}`;
    }
};
