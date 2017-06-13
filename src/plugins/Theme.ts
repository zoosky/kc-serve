import * as path from 'path';
import StaticBase from './StaticBase';
const debug = require('debug')('kc:plugins:theme');

export default class extends StaticBase {
    public readonly css: string;

    constructor(theme: string) {
        let pkg = resolve(theme);
        debug(pkg);

        super(path.dirname(pkg), '/theme');
        this.css = path.posix.join(this.path, path.basename(pkg));
    }
}

function resolve(theme: string): string {
    try {
        return require.resolve(theme);
    } catch (err) {
    }

    try {
        return resolveFromReveal(theme); 
    }
    catch (err) {
    }

    throw new Error(`Theme \'${theme}\' not found. It must be either a resolvable module or a default reveal.js theme.`);
}

function resolveFromReveal(theme: string) {
    if (!theme.endsWith('.css')) {
        theme += '.css';
    }

    return require.resolve(path.posix.join('reveal.js', 'css', 'theme', theme));
}

