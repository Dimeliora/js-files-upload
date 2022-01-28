export const viewAllElmStateHandler = (viewAllElm, isVisible) => {
    if (isVisible) {
        viewAllElm.parentElement.classList.remove('recent__view-all--hidden');
    } else {
        viewAllElm.parentElement.classList.add('recent__view-all--hidden');
    }
};
