import * as path from 'path';
import StaticBase from './StaticBase';

export default class extends StaticBase {
    public readonly css: string;

    constructor(style: string) {
        let pkg = path.resolve(require.resolve(style));
        super(path.dirname(pkg), '/css/highlight');

        this.css = path.posix.join(this.path, path.basename(pkg));
    }
}