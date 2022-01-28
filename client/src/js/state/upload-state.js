class UploadState {
    isUploading = false;
    uploadFiles = [];

    resetUploading() {
        this.isUploading = false;
    }

    setFilesToUpload(files) {
        this.isUploading = true;
        this.uploadFiles = files;
    }

    resetUploadState() {
        this.isUploading = false;
        this.uploadFiles = [];
    }
}

export default new UploadState();
