import CustomCss from './plugins/CustomCss';
import HighlightPlugin from './plugins/Highlight';
import ImgPlugin from './plugins/Img';
import RevealPlugin from './plugins/Reveal';
import SlidesPlugin from './plugins/Slides';
import TemplatePlugin from './plugins/Template';
import ThemePlugin from './plugins/Theme';

import IndexTemplate from './template/Index';
import SlidesTemplate from './template/Slides';
import CustomCssTemplate from './template/CustomCss';
import * as RevealTemplate from './template/Reveal';
import ThemeTemplate from './template/Theme';
import HighlightTemplate from './template/Highlight';

import Server from './Server';

export interface Options {
    cwd: string;
    title: string;
    theme: string;
    highlight: string;
}

export default function (options: Options): Server {
    let revealPlugin = new RevealPlugin();
    let cssPlugin = new CustomCss(options.cwd);
    let highlightPlugin = new HighlightPlugin(options.highlight);
    let slidesPlugin = new SlidesPlugin(options.cwd);
    let themePlugin = new ThemePlugin(options.theme);
    let imgPlugin = new ImgPlugin(options.cwd);

    let index = new IndexTemplate(options.title,
        [
            new RevealTemplate.Css(revealPlugin.path),
            new ThemeTemplate(themePlugin.css),
            new HighlightTemplate(highlightPlugin.css),
            new CustomCssTemplate(cssPlugin, cssPlugin.path),
            new RevealTemplate.PdfScript(revealPlugin.path)
        ],
        [
            new SlidesTemplate(slidesPlugin, slidesPlugin.path),
            new RevealTemplate.MainScript(revealPlugin.path)
        ]);
    let templatePlugin = new TemplatePlugin(index);

    return new Server([
        revealPlugin, 
        cssPlugin, 
        highlightPlugin, 
        slidesPlugin, 
        themePlugin, 
        imgPlugin, 
        templatePlugin // this plugin must be last because it listens on the root
    ]);
}