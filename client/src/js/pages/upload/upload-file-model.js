export default class FileItem {
    status = 'pending';
    message = null;
    domElm = null;

    constructor(id, file) {
        this.id = id;
        this.file = file;
        this.name = file.name;
    }
}
