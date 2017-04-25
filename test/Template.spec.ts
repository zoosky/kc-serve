import { expect } from 'chai';
import * as revealTemplate from '../src/template/reveal';
import * as slideTemplate from '../src/template/slide';
import { Slide, SlideFolder } from '../src/SlideObject';

describe('Template', () => {
    let context: revealTemplate.TemplateContext;

    beforeEach(() => {
        context = {
            title: 'test', 
            slides: [], 
            css: [], 
            highlightTheme: '', 
            dirs: {
                slides: 'slides',
                css: 'css',
                theme: 'theme',
                reveal: 'reveal',
                highlight: 'css/highlight'
            }
        };
    });

    it('renders reveal html', () => {
        const result = revealTemplate.html(context);
        expect(result).to.match(/<div class="reveal"/m);
    });

    it('lists a slide', () => {
        context.slides = [new Slide('00-intro.md')];

        let result = revealTemplate.html(context);
        expect(result).to.match(/<section data-markdown="slides\/00-intro.md"/m);
    });

    it('does not nest a root-level slide', () => {
        context.slides = [new Slide('00-intro.md')];
        expect(revealTemplate.html(context)).to.not.match(/<section>[\n\r\s]*<section data-markdown="slides\/00-intro.md"/m);
    });

    it('nests vertical slides', () => {
        context.slides = [new SlideFolder('01-folder', [new Slide('00-intro.md')])];
        expect(revealTemplate.html(context)).to.match(/<section>[\n\r\s]*<section data-markdown="slides\/00-intro.md"/m);
    });

    it('does not list a html slide yet', () => {
        context.slides = [new Slide('00-intro.html')];
        expect(revealTemplate.html(context)).to.not.match(/00-intro.html/m);
    });

    it('includes custom css', () => {
        context.css = ['custom.css'];
        expect(revealTemplate.html(context)).to.match(/<link rel="stylesheet" href="css\/custom.css">/m);
    });

    it('includes specified highlight theme', () => {
        context.dirs.highlight = 'css/highlight';
        context.highlightTheme = 'zenburn';
        expect(revealTemplate.html(context)).to.match(/<link rel="stylesheet" href="css\/highlight\/zenburn.css">/m);
    });

    it('matches slides dir with template', () => {
        context.dirs.slides = 'asdfasdf';
        context.slides = [new Slide('01-test.md')];
        expect(revealTemplate.html(context)).to.contain('data-markdown="asdfasdf/01-test.md"');
    });

    it('matches css dir with template', () => {
        context.dirs.css = 'adsfasdf';
        context.css = ['custom.css'];
        expect(revealTemplate.html(context)).to.contain('href="adsfasdf/custom.css"');
    });

    it ('creates image slides', () => {
        context.slides = [new Slide('01-logo.png'), new Slide('01-logo.png')];

        let result = revealTemplate.html(context);
        expect(result).to.contain('<section><img src="slides/01-logo.png" class="stretch"></section>');
    });

    it ('ignores non-slides', () => {
        expect(slideTemplate.html('slides', { isFolder: false, isMarkdown: false, isImage: false, name: 'none-of-your-business' })).to.eq('<empty />');
    });
});