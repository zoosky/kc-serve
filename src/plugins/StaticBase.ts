import * as express from 'express';
import { ServerPlugin } from '../Server';

export default abstract class implements ServerPlugin {
    constructor(public root: string, public path: string) {

    }

    attach(app: express.Express) {
        app.use(this.path, express.static(this.root));
    }
}