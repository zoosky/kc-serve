import * as express from 'express';
import { ServerPlugin } from '../Server';

export default abstract class implements ServerPlugin {
    constructor(public dir: string, public path: string) {
    }

    handler(): express.Handler {
        return express.static(this.dir);
    }
}