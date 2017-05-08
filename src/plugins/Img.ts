import * as path from 'path';
import { StaticBase } from './StaticBase';

export class Img extends StaticBase {
    constructor(cwd: string) {
        super(path.join(cwd, 'img'), '/img');
    }
}
