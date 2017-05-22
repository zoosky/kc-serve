import * as path from 'path';
import StaticBase from './StaticBase';

export default class extends StaticBase {
    constructor() {
        let pkg = path.resolve(require.resolve('reveal.js'), '..', '..');
        super(pkg, '/reveal');
    }
}