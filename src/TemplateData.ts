import { SlideObject } from './SlideObject';

export interface TemplateData {
    title: string;
    slides: (SlideObject | SlideObject[])[],
    css: string[],
    server: {},
    highlightTheme?: string;
}