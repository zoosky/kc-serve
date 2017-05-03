import * as path from 'path';
import * as express from 'express';
import * as fs from 'mz/fs';
import { SlideConvert, SlideObject } from '../SlideObject';
const walk = require('walkdir');

export class Slides {
    public readonly root: string;

    path = '/slides';

    constructor(cwd: string) {
        this.root = path.join(cwd, 'slides');
    }

    async resolve(): Promise<SlideObject[]> {
        return (await fs.exists(this.root)) ?
            this.readTree() :
            Promise.resolve([]);
    }
        
    private readTree(): Promise<SlideObject[]> {
        return new Promise<SlideObject[]>((resolve, reject) => {
            let items = new Array<string>();
            let emitter = walk(this.root);

            emitter.on('file', (name: string, _stat: any) => items.push(path.relative(this.root, name)));
            emitter.on('end', () => resolve(SlideConvert.from(items)));
            emitter.on('error', reject);
        });
    }

    attach(app: express.Express) {
        app.use(this.path, express.static(this.root));
    }
}