"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class SlideObject {
    constructor(file) {
        this.file = file;
        const extension = path.extname(file);
        this.isMarkdown = extension === '.md';
        this.isImage = ['.png', '.gif', '.jpg', '.jpeg', '.svg'].some(ext => ext === extension);
        this.isHtml = extension === '.html';
    }
}
exports.SlideObject = SlideObject;
//# sourceMappingURL=SlideObject.js.map