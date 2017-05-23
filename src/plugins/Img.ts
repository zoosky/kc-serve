import * as path from 'path';
import StaticBase from './StaticBase';

export default class extends StaticBase {
    constructor(cwd: string) {
        super(path.join(cwd, 'img'), '/img');
    }
}
