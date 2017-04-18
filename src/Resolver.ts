import * as path from 'path';
import * as fs from 'mz/fs';
import * as debugFn from 'debug';
import { SlideConvert, SlideObject } from './SlideObject';
const walk = require('walkdir');

const debug = debugFn('kc:Resolver');

export class Resolver {
    dirs = {
        slides: () => path.join(this.root, 'slides'),
        css: () => path.join(this.root, 'css'),
        img: () => path.join(this.root, 'img')
    };

    constructor(private root: string) {
        debug(root);
    }

    async slides(): Promise<SlideObject[]> {
        return (await fs.exists(this.dirs.slides())) ?
            Resolver.readTree(this.dirs.slides()) :
            Promise.resolve([]);
    }

    async css(): Promise<string[]> {
        return (await fs.exists(this.dirs.css())) ? 
            fs.readdir(this.dirs.css()) :
            Promise.resolve([]);
    }
    
    private static readTree(dir: string): Promise<SlideObject[]> {
        return new Promise<SlideObject[]>((resolve, reject) => {
            let items = new Array<string>();
            let emitter = walk(dir);

            emitter.on('file', (name: string, _stat: any) => items.push(path.relative(dir, name)));
            emitter.on('end', () => resolve(SlideConvert.from(items)));
            emitter.on('error', reject);
        });
    }

    reveal() {
        return path.resolve(require.resolve('reveal.js'), '..', '..');
    }

    highlight() {
        return path.resolve(require.resolve('highlight.js'), '..', '..');
    }

    highlightCss() {
        return path.join(this.highlight(), 'styles');
    }

    theme() {
        return path.join(__dirname, 'theme');
    }
}
