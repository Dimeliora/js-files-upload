export const createUploadHTML = () => {
    return `
        <div class="upload paper">
            <div class="upload__header header">
                <nav class="header__navigation">
                    <a
                        href="#upload"
                        class="header__link header__link--active"
                        >New Upload</a
                    >
                    <a href="#recent" class="header__link">Recent</a>
                </nav>
                <a
                    href="#"
                    class="header__home home-link"
                    title="Dashboard"
                    aria-label="Dashboard"
                >
                    <svg class="home-link__icon">
                        <use href="/icons/icon-sprite.svg#settings" />
                    </svg>
                </a>
            </div>
            <div class="upload__dropzone">
                <input type="file" style="display: none" multiple data-upload-input />
                <div class="upload__dropzone-inner" tabindex="0" data-upload-dropzone>
                    Click to browse or <br/> drag and drop your files
                </div>
            </div>
        </div>
    `;
};

export const createUploadFilesModalHTML = () => {
    return `
        <div class="modal">
            <div class="modal__content paper">
                <div class="upload-files">
                    <ul class="upload-files__list" data-upload-modal></ul>
                    <button
                        class="upload-files__cancel button"
                        data-upload-cancel
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;
};

export const createUploadFilesListItemHTML = (filename) => {
    return `
        <li class="upload-files__item" data-upload-file>
            <div class="upload-files__name">${filename}</div>
            <div class="upload-files__status">
                <div
                    class="upload-files__progress progress progress--text"
                >
                    <div
                        class="progress__filler"
                        style="width: 0%"
                        data-upload-file-progress-bar
                    ></div>
                    <span class="progress__text" data-upload-file-progress-value>0%</span>
                </div>
                <div class="upload-files__error" data-upload-file-error></div>
            </div>
            <div class="upload-files__controls">
                <button
                    class="upload-files__abort icon-button"
                    title="Cancel file upload"
                    aria-label="Cancel file upload"
                    data-upload-file-abort
                >
                    <svg class="icon-button__icon">
                        <use
                            href="/icons/icon-sprite.svg#close"
                        />
                    </svg>
                </button>
                <svg
                    class="upload-files__icon upload-files__icon--done"
                >
                    <use href="/icons/icon-sprite.svg#tick" />
                </svg>
                <svg
                    class="upload-files__icon upload-files__icon--error"
                >
                    <use
                        href="/icons/icon-sprite.svg#alert-error"
                    />
                </svg>
            </div>
        </li>
    `;
};
