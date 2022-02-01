export const createNotFoundHTML = () => {
    return `
        <div class="not-found">
            <h1 class="not-found__heading">404</h1>
            <p class="not-found__text">Looks like this page does not exist</p>
            <button
                class="not-found__button button button--big"
                data-not-found-back
            >
                Back Home
            </button>
        </div>
    `;
};
