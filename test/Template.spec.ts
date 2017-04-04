import { expect } from 'chai';
import { Template } from '../src/Template';
import { SlideObject } from '../src/SlideObject';

describe('Template', () => {
    it('should render', () => {
        const data = {
            title: 'test',
            slides: [],
            css: [],
            server: {}
        };
        expect(new Template(data).compile()).to.match(/<div class="reveal"/m);
    });

    it('should list a slide', () => {
        const data = {
            slides: [new SlideObject('00-intro.md')],
            css: [],
            title: 'test',
            server: {
                slides: '/slides'
            }
        };

        expect(new Template(data).compile()).to.match(/<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('should not nest a root-level slide', () => {
        const data = {
            slides: [new SlideObject('00-intro.md')],
            title: 'test',
            css: [],
            server: {
                slides: '/slides'
            }
        };

        expect(new Template(data).compile).to.not.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('should nest vertical slides', () => {
        const data = {
            slides: [[new SlideObject('00-intro.md')]],
            css: [],
            title: 'test',
            server: {
                slides: '/slides'
            }
        };
        expect(new Template(data).compile()).to.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });


    it('should not list a html slide yet', () => {
        const data = {
            slides: [new SlideObject('00-intro.html')],
            css: [],
            title: 'test',
            server: {
                slides: '/slides'
            }
        };

        expect(new Template(data).compile()).to.not.match(/00-intro.html/m);
    })

    it('should include custom css', () => {
        const data = {
            title: 'test',
            slides: [],
            css: ['custom.css'],
            server: {}
        };

        expect(new Template(data).compile()).to.match(/<link rel="stylesheet" href=\/css\/custom.css>/m);
    });

    it('should include default vs highlight theme', () => {
        const data = {
            title: 'test',
            slides: [],
            css: [],
            server: {}
        };

        expect(new Template(data).compile()).to.match(/<link rel="stylesheet" href="\/css\/highlight\/vs.css">/m);
    });

    it('should include specified highlight theme', () => {
        const data = {
            title: 'test',
            slides: [],
            css: [],
            server: {},
            highlightTheme: 'zenburn'
        };

        expect(new Template(data).compile()).to.match(/<link rel="stylesheet" href="\/css\/highlight\/zenburn.css">/m);
    });

    it('should use the specified mount point for slides', () => {
        const data = {
            title: 'test',
            slides: [new SlideObject('00-intro.md')],
            css: [],
            server: {
                slides: '/server_defined_mountpoint'
            }
        };

        expect(new Template(data).compile()).to.match(/<section data-markdown="\/server_defined_mountpoint\/00-intro.md/m);
    });
});