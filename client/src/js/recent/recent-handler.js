import { createRecentHTML } from './recent-template-creators';

export const recentHandler = (appContainer) => {
    appContainer.innerHTML = createRecentHTML();
};
