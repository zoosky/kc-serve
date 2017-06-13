import { expect } from 'chai';
import template from '../../src/template/Slides';
import { Slide, SlideFolder, SlideObject } from '../../src/SlideObject';

describe('Slides template', () => {
    let slides: SlideObject[];
    let resolver = { resolve: () => Promise.resolve(slides) };

    it('renders reveal html', async () => {
        const result = await new template({ resolve: () => Promise.resolve([]) }, '/slides').body();
        expect(result).to.match(/<div class="reveal"/m);
    });

    it('lists a slide', async () => {
        slides = [new Slide('00-intro.md')];

        let result = await new template(resolver, '/slides').body();
        expect(result).to.match(/<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('does not nest a root-level slide', async () => {
        slides = [new Slide('00-intro.md')];
        expect(await new template(resolver, '/slides').body()).to.not.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('nests vertical slides', async () => {
        slides = [new SlideFolder('01-folder', [new Slide('00-intro.md')])];
        expect(await new template(resolver, '/slides').body()).to.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('write the normal vertical separator for root level slides', async () => {
        slides = [new Slide('00-intro.md')];
        expect(await new template(resolver, '/slides').body()).to.match(/data-separator="\^---\$"/m);
    });

    it('write a different vertical separator for nested slides', async () => {
        slides = [new SlideFolder('01-folder', [new Slide('00-intro.md')])];
        expect(await new template(resolver, '/slides').body()).to.match(/data-separator="\^---\?\$"/m);
    });

    it('does not list a html slide yet', async () => {
        slides = [new Slide('00-intro.html')];
        expect(await new template(resolver, '/slides').body()).to.not.match(/00-intro.html/m);
    });

    it('matches slides dir with template', async () => {
        slides = [new Slide('01-test.md')];
        expect(await new template(resolver, 'asdfasdf').body()).to.contain('data-markdown="asdfasdf/01-test.md"');
    });

    it ('creates image slides', async () => {
        slides = [new Slide('01-logo.png'), new Slide('01-logo.png')];

        let result = await new template(resolver, '/slides').body();
        expect(result).to.contain('<section><img src="\/slides/01-logo.png" class="stretch"></section>');
    });

    it ('ignores non-slides', async () => {
        let slide: SlideObject = { isFolder: false, isMarkdown: false, isImage: false, name: 'none-of-your-business' };
        slides = [slide];
        let result = await new template(resolver, '/slides').body();

        expect(result).to.eq('<div class="reveal"><div class="slides"><empty /></div></div>');
    });
});