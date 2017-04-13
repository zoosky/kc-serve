import { expect } from 'chai';
import { Template } from '../src/Template';
import { Slide, SlideFolder } from '../src/SlideObject';

describe('Template', () => {
    it('should render', () => {
        const data = {
            title: 'test',
            slides: [],
            css: []
        };
        expect(new Template(data).compile()).to.match(/<div class="reveal"/m);
    });

    it('should list a slide', () => {
        const data = {
            slides: [new Slide('00-intro.md')],
            css: [],
            title: 'test'
        };

        expect(new Template(data).compile()).to.match(/<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('should not nest a root-level slide', () => {
        const data = {
            slides: [new Slide('00-intro.md')],
            title: 'test',
            css: []
        };

        expect(new Template(data).compile).to.not.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('should nest vertical slides', () => {
        const data = {
            slides: [new SlideFolder('01-folder', [new Slide('00-intro.md')])],
            css: [],
            title: 'test'
        };
        expect(new Template(data).compile()).to.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });


    it('should not list a html slide yet', () => {
        const data = {
            slides: [new Slide('00-intro.html')],
            css: [],
            title: 'test'
        };

        expect(new Template(data).compile()).to.not.match(/00-intro.html/m);
    });

    it('should include custom css', () => {
        const data = {
            title: 'test',
            slides: [],
            css: ['custom.css']
        };

        expect(new Template(data).compile()).to.match(/<link rel="stylesheet" href=\/css\/custom.css>/m);
    });

    it('should include default vs highlight theme', () => {
        const data = {
            title: 'test',
            slides: [],
            css: []
        };

        expect(new Template(data).compile()).to.match(/<link rel="stylesheet" href="\/css\/highlight\/vs.css">/m);
    });

    it('should include specified highlight theme', () => {
        const data = {
            title: 'test',
            slides: [],
            css: [],
            highlightTheme: 'zenburn'
        };

        expect(new Template(data).compile()).to.match(/<link rel="stylesheet" href="\/css\/highlight\/zenburn.css">/m);
    });

});