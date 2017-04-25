import * as path from 'path';
import * as express from 'express';

export class Highlight {
    root: string;
    path = '/css/highlight';

    constructor() {
        let base = path.resolve(require.resolve('highlight.js'), '..', '..');
        this.root = path.join(base, 'styles');
    }

    attach(app: express.Express) {
        app.use(this.path, express.static(this.root));
    }
}