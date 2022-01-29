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
    const { name, type, size, createdAt } = file;

    return `
        <li class="recent__list-item file">
            <svg class="file__icon">
                <use href="/icons/icon-sprite.svg#${getMimeTypeIcon(type)}" />
            </svg>
            <div class="file__info">
                <div class="file__name">${name}</div>
                <div class="file__upload-time">
                    ${getFormattedPassedTime(createdAt)}
                </div>
            </div>
            <div class="file__size">${getFormattedFileSize(size)}</div>
            <button
                class="file__controls icon-button"
                title="File actions"
                aria-label="File actions"
                data-file-actions
            >
                <svg class="icon-button__icon">
                    <use href="/icons/icon-sprite.svg#more" />
                </svg>
            </button>
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
