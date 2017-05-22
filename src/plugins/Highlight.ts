import * as path from 'path';
import StaticBase from './StaticBase';

export default class extends StaticBase {
    constructor() {
        let pkg = path.resolve(require.resolve('highlight.js'), '..', '..');
        super(path.join(pkg, 'styles'), '/css/highlight');
    }
}