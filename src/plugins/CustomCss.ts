import * as path from 'path';
import * as fs from 'mz/fs';
import StaticBase from './StaticBase';

export default class extends StaticBase {
    constructor(cwd: string) {
        super(path.join(cwd, 'css'), '/css');
    }

    async resolve(): Promise<string[]> {
        return (await fs.exists(this.root)) ?
            fs.readdir(this.root) :
            Promise.resolve([]);
    }
}