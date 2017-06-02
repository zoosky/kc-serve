import Index from '../template/Index';
import { ServerPlugin } from '../Server';
import * as express from 'express';

export default class implements ServerPlugin {
    path = '/';

    constructor(private index: Index) {
    }

    attach(app: express.Express) {
        app.get(this.path, async (_: any, res: express.Response) => { 
            res.status(200).send(await this.index.render());
        });
    }
}