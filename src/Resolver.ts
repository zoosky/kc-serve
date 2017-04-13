import * as path from 'path';
import * as fs from 'mz/fs';
import * as debugFn from 'debug';
import { SlideConvert, SlideObject } from './SlideObject';
const walk = require('walkdir');

const debug = debugFn('kc:Resolver');

export class Resolver {

    private slidesDirectory: string;

    constructor(private root: string) {
        debug(root);
        this.slidesDirectory = path.join(root, 'slides');
    }

    slides(): Promise<SlideObject[]> {
        if (fs.existsSync(this.slidesDirectory)) {
            return this.readTree();
        } else {
            return Promise.resolve([]);
        }
    }

    css() {
        const folder = path.join(this.root, 'css');
        if (fs.existsSync(folder)) {
            return fs.readdirSync(folder);
        } else {
            return [];
        }
    }
    
    private readTree(): Promise<SlideObject[]> {
        return new Promise<SlideObject[]>((resolve, reject) => {
            let items = new Array<string>();
            let emitter = walk(this.slidesDirectory);

            emitter.on('file', (name: string, _stat: any) => items.push(path.relative(this.slidesDirectory, name)));
            emitter.on('end', () => resolve(SlideConvert.from(items)));
            emitter.on('error', reject);
        });
    }

    static reveal() {
        return path.resolve(require.resolve('reveal.js'), '..', '..');
    }
    static highlight() {
        return path.resolve(require.resolve('highlight.js'), '..', '..');
    }
}
