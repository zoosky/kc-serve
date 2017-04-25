import { html, TemplateContext } from '../template/reveal';
import { SlideObject } from '../SlideObject';
import * as express from 'express';
import * as path from 'path';

export interface PathProvider {
    path: string;
}

export interface ContentResolver<T> {
    resolve(): Promise<T>;
}

export class Template {
    path = '/';

    relative(p: PathProvider) {
        return path.relative(this.path, p.path);
    }

    constructor(
        private title: string, 
        private reveal: PathProvider,
        private css: PathProvider & ContentResolver<string[]>,
        private highlight: PathProvider, 
        private slides: PathProvider & ContentResolver<SlideObject[]>,
        private theme: PathProvider) {
    }

    attach(app: express.Express) {
        app.get(this.path, async (_: any, res: express.Response) => { 
            const context = this.CreateContext();
            res.status(200).send(html(await context));
        });
    }

    async CreateContext(): Promise<TemplateContext> {
        return  {
            slides: await this.slides.resolve(),
            css: await this.css.resolve(),
            title: this.title,
            highlightTheme: 'vs',
            dirs: {
                slides: this.relative(this.slides),
                css: this.relative(this.css),
                theme: this.relative(this.theme),
                reveal: this.relative(this.reveal),
                highlight: this.relative(this.highlight)
            }
        };
    }
}