class UploadState {
    files = [];

    getFileById(id) {
        return this.files.find((item) => item.id === id);
    }
}

export class FileItem {
    status = 'pending';
    error = null;
    domElm = null;

    constructor(id, file) {
        this.id = id;
        this.file = file;
        this.name = file.name;
    }
}

export default new UploadState();
