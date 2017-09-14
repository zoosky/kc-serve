import * as path from 'path';
import * as _ from 'lodash';
let compare = require('natural-compare');

export type SlideObject = SlideFolder | Slide;

export class Slide {

    public readonly isFolder = false;
    public readonly isMarkdown: boolean;
    public readonly isImage: boolean;
    constructor(public readonly name: string) {
        const extension = path.extname(name);
        this.isMarkdown = extension === '.md';
        this.isImage = ['.png', '.gif', '.jpg', '.jpeg', '.svg'].some(ext => ext === extension.toLowerCase());
    }
}

export class SlideFolder {
    public readonly isFolder = true;

    constructor(public readonly name: string, public readonly slides: Slide[]) {
    }
}

export class SlideConvert {
    static from(items: string[]): SlideObject[] {
        return _(items)
            .map(x => new Slide(x))
            .filter(_ => _.isMarkdown || _.isImage)
            .sort((a: Slide, b: Slide) => compare(a.name, b.name)) // pre-order slides in sub-folders
            .groupBy(x => path.dirname(x.name).split(path.sep)[0]) // group by first folder
            .map((values: Slide[], key: string) => key === '.' ? values : new SlideFolder(key, values)) // wrap slides from sub-folders into SlideFolder object
            .flatten<SlideObject>()
            .sort((a: Slide, b: Slide) => compare(a.name, b.name)) // put sub-folders in order
            .value();
    }
}