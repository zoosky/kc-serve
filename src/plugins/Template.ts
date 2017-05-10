import { Index } from '../template/Index';
import * as express from 'express';

export class Template {
    path = '/';

    constructor(private index: Index) {
    }

    attach(app: express.Express) {
        app.get(this.path, async (_: any, res: express.Response) => { 
            res.status(200).send(await this.index.render());
        });
    }
}