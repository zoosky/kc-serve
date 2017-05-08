import * as path from 'path';
import { StaticBase } from './StaticBase';

export class Reveal extends StaticBase {
    constructor() {
        let root = path.resolve(require.resolve('reveal.js'), '..', '..');
        super(root, '/reveal');
    }
}