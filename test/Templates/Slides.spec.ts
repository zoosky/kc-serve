import { expect } from 'chai';
import * as templates from '../../src/template/all';
import Slides from '../../src/template/Slides';
import { Slide, SlideFolder, SlideObject } from '../../src/SlideObject';

describe('Slides template', () => {
    let slides: SlideObject[];
    let resolver = { resolve: () => Promise.resolve(slides) };


    it('renders reveal html', async () => {
        const result = await new templates.Slides({ resolve: () => Promise.resolve([]) }, '/slides').render();
        expect(result).to.match(/<div class="reveal"/m);
    });

    it('lists a slide', async () => {
        slides = [new Slide('00-intro.md')];

        let result = await new Slides(resolver, '/slides').render();
        expect(result).to.match(/<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('does not nest a root-level slide', async () => {
        slides = [new Slide('00-intro.md')];
        expect(await new Slides(resolver, '/slides').render()).to.not.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('nests vertical slides', async () => {
        slides = [new SlideFolder('01-folder', [new Slide('00-intro.md')])];
        expect(await new Slides(resolver, '/slides').render()).to.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    });

    it('does not list a html slide yet', async () => {
        slides = [new Slide('00-intro.html')];
        expect(await new Slides(resolver, '/slides').render()).to.not.match(/00-intro.html/m);
    });

  

    it('matches slides dir with template', async () => {
        slides = [new Slide('01-test.md')];
        expect(await new Slides(resolver, 'asdfasdf').render()).to.contain('data-markdown="asdfasdf/01-test.md"');
    });

   

    it ('creates image slides', async () => {
        slides = [new Slide('01-logo.png'), new Slide('01-logo.png')];

        let result = await new Slides(resolver, '/slides').render();
        expect(result).to.contain('<section><img src="\/slides/01-logo.png" class="stretch"></section>');
    });

    it ('ignores non-slides', async () => {
        let slide: SlideObject = { isFolder: false, isMarkdown: false, isImage: false, name: 'none-of-your-business' };
        slides = [slide];
        let result = await new Slides(resolver, '/slides').render();

        expect(result).to.eq('<div class="reveal"><div class="slides"><empty /></div></div>');
    });
});