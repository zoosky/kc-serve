import * as elements from 'typed-html';
import { TemplatePart } from './Index';

interface CustomCssResolver {
    resolve: () => Promise<string[]>;
}

export class CustomCss implements TemplatePart {
    constructor (private resolver: CustomCssResolver, 
        private path: string) {
    }

    public async render(): Promise<string> {
        return (await Promise.all((await this.resolver.resolve()).map(_ => <link rel="stylesheet" href={`${this.path}/${_}`}></link>))).join('\n');
    }
}