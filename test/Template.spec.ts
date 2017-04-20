import { expect } from 'chai';
import { Template } from '../src/Template';
import { Slide, SlideFolder } from '../src/SlideObject';

describe('Template', () => {
    it('should render', () => {
        const result = new Template('test').compile([], []);
        expect(result).to.match(/<div class="reveal"/m);
    });

    it('should list a slide', () => {
        expect(new Template('test').compile([new Slide('00-intro.md')], [])).to.match(/<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('should not nest a root-level slide', () => {
        expect(new Template('test').compile([new Slide('00-intro.md')], [])).to.not.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('should nest vertical slides', () => {
        expect(new Template('test').compile([new SlideFolder('01-folder', [new Slide('00-intro.md')])], [])).to.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('should not list a html slide yet', () => {
        expect(new Template('test').compile([new Slide('00-intro.html')], [])).to.not.match(/00-intro.html/m);
    });

    it('should include custom css', () => {
        expect(new Template('test').compile([], ['custom.css'])).to.match(/<link rel="stylesheet" href="\/css\/custom.css">/m);
    });

    it('should include default vs highlight theme', () => {
        expect(new Template('test').compile([], [])).to.match(/<link rel="stylesheet" href="\/css\/highlight\/vs.css">/m);
    });

    it('should include specified highlight theme', () => {
        expect(new Template('test', 'zenburn').compile([], [])).to.match(/<link rel="stylesheet" href="\/css\/highlight\/zenburn.css">/m);
    });

    it('matches slides dir with template', () => {
        let template = new Template('test');
        expect(template.compile([new Slide('01-test.md')], [])).to.contain(template.dirs.slides);
    });

    it('matches slides dir with template', () => {
        let template = new Template('test');
        expect(template.compile([new Slide('01-test.md')], [])).to.contain(`data-markdown="${template.dirs.slides}/01-test.md`);
    });

    it('matches css dir with template', () => {
        let template = new Template('test');
        expect(template.compile([], ['custom.css'])).to.contain(`href="${template.dirs.css}/custom.css"`);
    });
});