import * as elements from 'typed-html';
import { TemplatePart } from './Index';

export class Theme implements TemplatePart {
    constructor (private root: string) {
    }

    public render(): string {
        return <link rel="stylesheet" href={`${this.root}/infosupport.css`} id="theme"></link>;
    }
}