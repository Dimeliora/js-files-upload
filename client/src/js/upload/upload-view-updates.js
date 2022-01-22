export const setDropzoneHoveredClass = (dropzoneElm) => {
    dropzoneElm.classList.add('upload__dropzone-inner--hovered');
};

export const removeDropzoneHoveredClass = (dropzoneElm) => {
    dropzoneElm.classList.remove('upload__dropzone-inner--hovered');
};
