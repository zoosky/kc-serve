"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const templates = require("../../src/template/all");
const Slides_1 = require("../../src/template/Slides");
const SlideObject_1 = require("../../src/SlideObject");
describe('Slides template', () => {
    let slides;
    let resolver = { resolve: () => Promise.resolve(slides) };
    it('renders reveal html', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const result = yield new templates.Slides({ resolve: () => Promise.resolve([]) }, '/slides').render();
        chai_1.expect(result).to.match(/<div class="reveal"/m);
    }));
    it('lists a slide', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        slides = [new SlideObject_1.Slide('00-intro.md')];
        let result = yield new Slides_1.Slides(resolver, '/slides').render();
        chai_1.expect(result).to.match(/<section data-markdown="\/slides\/00-intro.md"/m);
    }));
    it('does not nest a root-level slide', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        slides = [new SlideObject_1.Slide('00-intro.md')];
        chai_1.expect(yield new Slides_1.Slides(resolver, '/slides').render()).to.not.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    }));
    it('nests vertical slides', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        slides = [new SlideObject_1.SlideFolder('01-folder', [new SlideObject_1.Slide('00-intro.md')])];
        chai_1.expect(yield new Slides_1.Slides(resolver, '/slides').render()).to.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    }));
    it('does not list a html slide yet', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        slides = [new SlideObject_1.Slide('00-intro.html')];
        chai_1.expect(yield new Slides_1.Slides(resolver, '/slides').render()).to.not.match(/00-intro.html/m);
    }));
    it('matches slides dir with template', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        slides = [new SlideObject_1.Slide('01-test.md')];
        chai_1.expect(yield new Slides_1.Slides(resolver, 'asdfasdf').render()).to.contain('data-markdown="asdfasdf/01-test.md"');
    }));
    it('creates image slides', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        slides = [new SlideObject_1.Slide('01-logo.png'), new SlideObject_1.Slide('01-logo.png')];
        let result = yield new Slides_1.Slides(resolver, '/slides').render();
        chai_1.expect(result).to.contain('<section><img src="\/slides/01-logo.png" class="stretch"></section>');
    }));
    it('ignores non-slides', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let slide = { isFolder: false, isMarkdown: false, isImage: false, name: 'none-of-your-business' };
        slides = [slide];
        let result = yield new Slides_1.Slides(resolver, '/slides').render();
        chai_1.expect(result).to.eq('<div class="reveal"><div class="slides"><empty /></div></div>');
    }));
});
//# sourceMappingURL=Slides.spec.js.map