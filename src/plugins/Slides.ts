import * as path from 'path';
import * as express from 'express';
import * as fs from 'mz/fs';
import { SlideConvert, SlideObject } from '../SlideObject';
import { ServerPlugin } from '../Server';
const debug = require('debug')('kc:plugins:slides');
const walk = require('walkdir');

export default class implements ServerPlugin {
    public readonly root: string;

    path = '/slides';

    constructor(cwd: string) {
        this.root = path.join(cwd, 'slides');
        debug(this.root);
    }

    wrap(item: any) {
        debug(item);
        return item;
    }

    async resolve(): Promise<SlideObject[]> {
        if (await fs.exists(this.root)) {
            let result = this.readTree();
            debug(result);

            return result;
        } else {
            debug(`no slides resolved from root ${this.root}`);
            return Promise.resolve([]);
        }
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