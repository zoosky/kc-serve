import Index from '../template/Index';
import { ServerPlugin } from '../Server';
import * as express from 'express';
const debug = require('debug')('kc:template:template');

export default class implements ServerPlugin {
    path = '/';

    constructor(private index: Index) {
    }

    attach(app: express.Express) {
        app.use(this.path, async (req: express.Request, res: express.Response, next) => { 
            debug(req);
            res.status(200).send(await this.index.render());
        });
    }
}