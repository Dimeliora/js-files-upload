export const hideRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.add('recent__view-all--hidden');
};

export const showRecentLoadElm = (recentLoadElm) => {
    recentLoadElm.classList.remove('recent__view-all--hidden');
};
