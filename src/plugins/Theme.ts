import * as path from 'path';
import StaticBase from './StaticBase';

export default class extends StaticBase {
    constructor() {
        let root = path.join(__dirname, '..', 'theme');
        super(root, '/theme');
    }
}