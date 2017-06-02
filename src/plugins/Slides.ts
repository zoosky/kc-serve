import * as path from 'path';
import * as express from 'express';
import * as fs from 'mz/fs';
import { SlideConvert, SlideObject } from '../SlideObject';
import { ServerPlugin } from '../Server';
const debug = require('debug')('kc:plugins:slides');
const walk = require('walkdir');

export default class implements ServerPlugin {
    public readonly dir: string;

    public readonly path = '/slides';

    constructor(cwd: string) {
        this.dir = path.join(cwd, 'slides');
        debug(this.dir);
    }

    async resolve(): Promise<SlideObject[]> {
        if (await fs.exists(this.dir)) {
            return this.readTree();
        } else {
            debug(`slides dir does not exist: ${this.dir}`);
            return Promise.resolve([]);
        }
    }
        
    private readTree(): Promise<SlideObject[]> {
        return new Promise<SlideObject[]>((resolve, reject) => {
            let items = new Array<string>();
            let emitter = walk(this.dir);

            emitter.on('file', (name: string, _stat: any) => items.push(path.relative(this.dir, name)));
            emitter.on('end', () => resolve(SlideConvert.from(items)));
            emitter.on('error', reject);
        });
    }

    attach(app: express.Express) {
        app.use(this.path, express.static(this.dir));
    }
}