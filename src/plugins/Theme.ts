import * as path from 'path';
import StaticBase from './StaticBase';
const debug = require('debug')('kc:plugins:theme');

export default class extends StaticBase {
    public readonly css: string;
    
    constructor() {
        let pkg = require.resolve('@infosupport/kc-cli-theme');
        debug(pkg);

        super(path.dirname(pkg), '/theme');
        this.css = path.posix.join(this.path, path.basename(pkg));
    }
}