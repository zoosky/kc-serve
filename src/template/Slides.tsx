import { Slide, SlideObject } from '../SlideObject';
import { TemplatePart } from './Index';
import * as elements from 'typed-html';

interface SlidesResolver {
    resolve(): Promise<SlideObject[]>;
}

export class Slides implements TemplatePart {
    constructor(private resolver: SlidesResolver, 
        private path: string) {
    }

    public async render(): Promise<string> {
      return <div class="reveal">
        <div class="slides">
          {await Promise.all((await this.resolver.resolve()).map(_ => {
            if (_.isFolder) {
              return <section>
                {_.slides.map(s => this.slideHtml(s))}
              </section>;
            } else {
              return this.slideHtml(_);
            }
          }))}
        </div>
      </div>;
    }

    slideHtml(slide: Slide): string {
        if (slide.isImage) {
            return <section><img src={`${this.path}/${slide.name}`} class="stretch" /></section>;
        } else if (slide.isMarkdown) {
            return <section data-markdown={`${this.path}/${slide.name}`} data-separator="^---$" data-separator-vertical="^--$"></section>;
        } else {
            return '<empty />';
        }
    }
}