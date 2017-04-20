import { html } from './template/reveal';
import { SlideObject } from './SlideObject';

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
        const context: TemplateContext = {
            slides,
            css,
            title: this.title,
            highlightTheme: this.highlightTheme,
            dirs: this.dirs
        };
        return html(context);
    }
}

export interface TemplateContext {
    slides: SlideObject[];
    css: string[];
    title: string;
    highlightTheme: string;
    dirs: {
        slides: string;
        css: string;
        theme: string;
        reveal: string;
        highlight: string;
    };
}