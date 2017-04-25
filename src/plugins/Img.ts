import * as path from 'path';
import * as express from 'express';

export class Img {
    root: string;
    path = '/img';

    constructor(cwd: string) {
        this.root = path.join(cwd, 'img');
    }

    attach(app: express.Express) {
        app.use(this.path, express.static(this.root));
    }
}
