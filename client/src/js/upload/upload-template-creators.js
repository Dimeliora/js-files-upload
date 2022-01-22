export const createUploadHTML = () => {
    return `
        <div class="upload paper">
            <div class="upload__header header">
                <nav class="header__navigation">
                    <a
                        href="#new-upload"
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
