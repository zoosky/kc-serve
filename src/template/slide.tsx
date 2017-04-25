import { Slide } from '../SlideObject';
import * as elements from 'typed-html';

export function html(slidesRoot: string, slide: Slide): string {
    if (slide.isImage) {
        return <section><img src={`${slidesRoot}/${slide.name}`} class="stretch" /></section>;
    } else if (slide.isMarkdown) {
        return <section data-markdown={`${slidesRoot}/${slide.name}`} data-separator="^---$" data-separator-vertical="^--$"></section>;
    } else {
        return '<empty />';
    }
}