import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

import { TemplateData } from './TemplateData';

const dir = path.join(__dirname, 'template');
const html = path.join(dir, 'reveal.html');
const slide = path.join(dir, 'slide.html');
handlebars.registerPartial('slide', fs.readFileSync(slide).toString());

const template = handlebars.compile(fs.readFileSync(html).toString());

export class Template {

    constructor(private data: TemplateData) {
        this.data.highlightTheme = this.data.highlightTheme || 'vs';
    }

    compile() {
        return template(this.data);
    }
}