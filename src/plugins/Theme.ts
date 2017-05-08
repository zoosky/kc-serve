import * as path from 'path';
import { StaticBase } from './StaticBase';

export class Theme extends StaticBase {
    constructor() {
        let root = path.join(__dirname, '..', 'theme');
        super(root, '/theme');
    }
}