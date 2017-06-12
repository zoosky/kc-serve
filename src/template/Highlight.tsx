import * as elements from 'typed-html';
import { TemplatePart } from './Index';

export default class implements TemplatePart {
    constructor (private css: string) {
    }

    public render(): string {
        return <link rel="stylesheet" href={ this.css }></link>;
    }
}