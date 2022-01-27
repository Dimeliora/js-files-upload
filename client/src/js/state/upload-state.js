class UploadState {
    isUploading = false;
    files = [];

    setFilesToUpload(files) {
        this.isUploading = true;
        this.files = files;
    }
}

export class FileItem {
    progress = 0;
    status = 'pending';
    error = null;

    constructor(id, file) {
        this.id = id;
        this.file = file;
        this.name = file.name;
    }
}

export default new UploadState();
