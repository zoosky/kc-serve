import * as path from 'path';
import * as express from 'express';

export class Theme {
    root: string;
    path = '/theme';

    constructor() {
        this.root = path.join(__dirname, '..', 'theme');
    }

    attach(app: express.Express) {
        app.use(this.path, express.static(this.root));
    }
}
