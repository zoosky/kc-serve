import * as plugins from './plugins/all';
import * as templates from './template/all';
import Server from './Server';

export default function (cwd: string, title: string): Server {
    let reveal = new plugins.Reveal();
    let css = new plugins.CustomCss(cwd);
    let highlight = new plugins.Highlight();
    let slides = new plugins.Slides(cwd);
    let theme = new plugins.Theme();
    let img = new plugins.Img(cwd);

    let index = new templates.Index(title,
        [
            new templates.Reveal.Css(reveal.path),
            new templates.Theme(theme.path),
            new templates.CustomCss(css, css.path),
            new templates.Reveal.PdfScript(reveal.path)
        ],
        [
            new templates.Slides(slides, slides.path),
            new templates.Reveal.MainScript(reveal.path)
        ]);
    let template = new plugins.Template(index);

    return new Server([reveal, css, highlight, slides, theme, template, img]);
}