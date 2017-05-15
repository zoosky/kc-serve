import * as path from 'path';
import { StaticBase } from './StaticBase';

export class CustomCss extends StaticBase {
    constructor(cwd: string) {
        super(path.join(cwd, 'css'), '/css');
    }
}