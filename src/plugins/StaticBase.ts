import * as fs from 'mz/fs';
import * as express from 'express';

export abstract class StaticBase {
    constructor(public root: string, public path: string) {

    }

    async resolve(): Promise<string[]> {
        return (await fs.exists(this.root)) ? 
            fs.readdir(this.root) :
            Promise.resolve([]);
    }

    attach(app: express.Express) {
        app.use(this.path, express.static(this.root));
    }
}