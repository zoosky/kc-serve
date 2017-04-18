import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

import { SlideObject } from './SlideObject';

const dir = path.join(__dirname, 'template');
const html = path.join(dir, 'reveal.html');
const slide = path.join(dir, 'slide.html');
handlebars.registerPartial('slide', fs.readFileSync(slide).toString());

const template = handlebars.compile(fs.readFileSync(html).toString());

export class Template {
    dirs = {
        slides: '/slides',
        css: '/css',
        theme: '/theme',
        reveal: '/reveal',
        highlight: '/css/highlight'
    };

    constructor(private title: string, private highlightTheme: string = 'vs') {
    }

    compile(slides: SlideObject[], css: string[]) {
        return template({ 
            slides,
            css,
            title: this.title,
            highlightTheme: this.highlightTheme,
            dirs: this.dirs
        });
    }
}