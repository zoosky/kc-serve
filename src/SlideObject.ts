import * as path from 'path';

export class SlideObject {

    public readonly isMarkdown: boolean;
    public readonly isImage: boolean;
    public readonly isHtml: boolean;

    constructor(public readonly file: string) {
        const extension = path.extname(file);
        this.isMarkdown = extension === '.md';
        this.isImage = ['.png', '.gif', '.jpg', '.jpeg', '.svg'].some(ext => ext === extension);
        this.isHtml = extension === '.html';
    }
}
