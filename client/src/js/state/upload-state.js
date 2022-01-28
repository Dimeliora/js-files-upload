class UploadState {
    isUploading = false;
    isUploadSuccessful = false;
    uploadFiles = [];

    resetUploading() {
        this.isUploading = false;
    }

    setSuccefullUpload() {
        this.isUploadSuccessful = true;
    }

    setFilesToUpload(files) {
        this.isUploading = true;
        this.isUploadSuccessful = false;
        this.uploadFiles = files;
    }

    resetUploadState() {
        this.isUploading = false;
        this.isUploadSuccessful = false;
        this.uploadFiles = [];
    }
}

export default new UploadState();
