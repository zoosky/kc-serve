import CustomCss from './plugins/CustomCss';
import Highlight from './plugins/Highlight';
import Img from './plugins/Img';
import Reveal from './plugins/Reveal';
import Slides from './plugins/Slides';
import Template from './plugins/Template';
import Theme from './plugins/Theme';

import IndexTemplate from './template/Index';
import SlidesTemplate from './template/Slides';
import CustomCssTemplate from './template/CustomCss';
import * as RevealTemplate from './template/Reveal';
import ThemeTemplate from './template/Theme';

import Server from './Server';

export default function (cwd: string, title: string): Server {
    let reveal = new Reveal();
    let css = new CustomCss(cwd);
    let highlight = new Highlight();
    let slides = new Slides(cwd);
    let theme = new Theme();
    let img = new Img(cwd);

    let index = new IndexTemplate(title,
        [
            new RevealTemplate.Css(reveal.path),
            new ThemeTemplate(theme.path),
            new CustomCssTemplate(css, css.path),
            new RevealTemplate.PdfScript(reveal.path)
        ],
        [
            new SlidesTemplate(slides, slides.path),
            new RevealTemplate.MainScript(reveal.path)
        ]);
    let template = new Template(index);

    return new Server([reveal, css, highlight, slides, theme, template, img]);
}