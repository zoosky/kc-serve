import * as path from 'path';
import * as express from 'express';

export class Reveal {
    root: string;
    path = '/reveal';

    constructor() {
        this.root = path.resolve(require.resolve('reveal.js'), '..', '..');
    }

    attach(app: express.Express) {
        app.use(this.path, express.static(this.root));
    }
}