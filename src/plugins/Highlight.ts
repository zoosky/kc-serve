import * as path from 'path';
import StaticBase from './StaticBase';
const debug = require('debug')('kc:plugins:highlight');
const findup = require('findup-sync');

export default class extends StaticBase {

    public readonly css: string;

    constructor(style: string) {
        let pkg = resolve(style);
        super(path.dirname(pkg), '/css/highlight');

        this.css = path.posix.join(this.path, path.basename(pkg));
    }
}

export function resolve(style: string) {
    if (!style.endsWith('.css')) {
        style += '.css';
    }

    style = style.replace(' ', '*');
    debug('searching for %s', style);

    const cwd = path.join(path.dirname(require.resolve('highlight.js/package.json')), 'styles');
    debug('highlight.js package location: %s', cwd);

    const highlight = findup(style, { cwd: cwd, nocase: true});
    debug('found style: %s', highlight);
    
    if (!highlight) {
        throw new Error(`Style '${style}' not found in highlight.js styles directory.`);
    }

    return highlight;
}
