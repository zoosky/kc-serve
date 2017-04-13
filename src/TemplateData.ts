import { SlideObject } from './SlideObject';

export interface TemplateData {
    title: string;
    slides: SlideObject[];
    css: string[];
    highlightTheme?: string;
}