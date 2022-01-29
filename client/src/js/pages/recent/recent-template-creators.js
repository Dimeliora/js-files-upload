import {
    getFormattedFileSize,
    getFormattedPassedTime,
} from '../../helpers/formatters';
import { getMimeTypeIcon } from './recent-mime-icons-map';

export const createRecentHTML = () => {
    return `
        <div class="recent paper" data-recent-block>
            <div class="recent__content">
                <ul class="recent__list" data-recent-list></ul>
                <div class="recent__view-all" data-recent-load></div>
            </div>
        </div>
    `;
};

export const createViewAllHTML = () => {
    return `
        <button
            class="recent__view-all-button button button--secondary"
            data-view-all
        >
            View all uploads
        </button>
    `;
};

export const createRecentFileHTML = (file) => {
    const { _id, name, type, size, createdAt } = file;

    return `
        <li class="recent__list-item file" data-file="${_id}">
            <svg class="file__icon">
                <use href="/icons/icon-sprite.svg#${getMimeTypeIcon(type)}" />
            </svg>
            <div class="file__info">
                <div class="file__name" title="${name}">${name}</div>
                <div class="file__upload-time">
                    ${getFormattedPassedTime(createdAt)}
                </div>
            </div>
            <div class="file__size">${getFormattedFileSize(size)}</div>
            <div class="file__actions">
                <button
                    class="file__download icon-button"
                    title="Download file"
                    aria-label="Download file"
                    data-file-dowload
                >
                    <svg class="icon-button__icon">
                        <use href="/icons/icon-sprite.svg#download" />
                    </svg>
                </button>
                <button
                    class="file__delete icon-button icon-button--danger"
                    title="Delete file"
                    aria-label="Delete file"
                    data-file-delete
                >
                    <svg class="icon-button__icon">
                        <use href="/icons/icon-sprite.svg#delete" />
                    </svg>
                </button>
            </div>
        </li>
    `;
};

export const createRecentPlaceholderHTML = (reason) => {
    let placeholderText = 'No files to show';
    let classname = '';

    if (reason === 'error') {
        placeholderText = 'Error occured during files list fetch';
        classname = 'recent__list-item--error';
    }

    return `
        <li class="recent__list-item recent__list-item--placeholder ${classname}">
            ${placeholderText}
        </li>
    `;
};
