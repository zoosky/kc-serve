import * as path from 'path';
import StaticBase from './StaticBase';

export default class extends StaticBase {
    constructor() {
        let root = path.resolve(require.resolve('reveal.js'), '..', '..');
        super(root, '/reveal');
    }
}