import Index from '../template/Index';
import { ServerPlugin } from '../Server';
import * as express from 'express';

export default class implements ServerPlugin {
    path = '/';

    constructor(private index: Index) {
    }

    handler() {
        return async (_req: express.Request, res: express.Response, _next: express.NextFunction) => { 
            res.status(200).send(await this.index.render());
        };
    }
}