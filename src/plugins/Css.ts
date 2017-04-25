import * as path from 'path';
import * as fs from 'mz/fs';
import * as express from 'express';

export class Css {
    public readonly root: string;

    path = '/css';

    constructor(cwd: string) {
        this.root = path.join(cwd, 'css');
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