import * as path from 'path';
import * as _ from 'lodash';

export interface SlideObject {
    readonly name: string;
}
export class Slide implements SlideObject {

    public readonly isMarkdown: boolean;
    public readonly isImage: boolean;

    public readonly isSlide: boolean;

    constructor(public readonly name: string) {
        const extension = path.extname(name);
        this.isMarkdown = extension === '.md';
        this.isImage = ['.png', '.gif', '.jpg', '.jpeg', '.svg'].some(ext => ext === extension);

        this.isSlide = this.isImage || this.isMarkdown;
    }
}

export class SlideFolder implements SlideObject {
    public readonly isFolder: boolean = true;

    constructor(public readonly name: string, public readonly slides: Slide[]) {
    }
}

export class SlideConvert {
    static from(items: string[]): SlideObject[] {
        return _(items)
            .map(x => new Slide(x))
            .filter(x => x.isSlide)
            .orderBy(x => x.name) // pre-order slides in sub-folders
            .groupBy(x => path.dirname(x.name).split(path.sep)[0]) // group by first folder
            .map((values: Slide[], key: string) => key === '.' ? values : new SlideFolder(key, values)) // wrap slides from sub-folders into SlideFolder object
            .flatten<SlideObject>()
            .orderBy(x => x.name) // put sub-folders in order
            .value();
    }
}