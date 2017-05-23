import * as path from 'path';
import StaticBase from './StaticBase';

export default class extends StaticBase {
    constructor() {
        let base = path.resolve(require.resolve('highlight.js'), '..', '..');
        super(path.join(base, 'styles'), '/css/highlight');
    }
}