import * as path from 'path';
import { expect } from 'chai';
import { Slide, SlideFolder, SlideConvert } from '../src/SlideObject';

describe('SlideObject', () => {
    it('should wrap a file into an object', () =>
        expect(new Slide('01-intro.md').name).to.eq('01-intro.md'));

    it('should report markdown', () => {
        expect(new Slide('01-intro.md').isMarkdown).to.be.true;
    });

    it('should report not markdown for other files', () => {
        expect(new Slide('01-intro.zip').isMarkdown).to.be.false;
    });

    it('should report images', () => {
        expect(new Slide('01-intro.png').isImage).to.be.true;
    });

    it('should report not image for other files', () => {
        expect(new Slide('01-intro.pdf').isImage).to.be.false;
    });

    describe('isImage', () => {

        ['bower.png', 'questionmark.gif', 'photo.jpg', 'photo.jpeg', 'photo.svg'].forEach(file => {
            it(`${path.extname(file)} should be an image`, () => expect(new Slide(file).isImage).to.be.true);
        });

        it('zip should not be an image', () => {
            expect(new Slide('demo.zip').isImage).to.be.false;
        });

        it('ignores casing in extension', () => {
            expect(new Slide('bower.PNG').isImage).to.be.true;
        });
    });
});

describe('SlideConvert', () => {
    describe('from string[]', () => {
        it ('returns slide objects', () => {
            expect(SlideConvert.from(['index.md'])).to.deep.eq([new Slide('index.md')]);
        });

        it ('filters non-slide objects', () => {
            expect(SlideConvert.from(['index.pdf'])).to.deep.eq([]);
        });

        it ('puts slides from sub directories into a slide folder', () => {
            let sub = '01-sub';
            let slide = path.join(sub, '01-slide.md');
            
            expect(SlideConvert.from([ slide ])).to.deep.eq([
                new SlideFolder(sub, [
                    new Slide(slide)
                ])
            ]);
        });

        it ('sort slide objects', () => {
            let slide1 = '01-slide.md';
            let slide2 = '02-slide.md';

            let items = [
                slide2,
                slide1
            ];
            expect(SlideConvert.from(items)).to.deep.eq([
                new Slide(slide1),
                new Slide(slide2)
            ]);
        });

        it ('sort slide objects in sub folders', () => {
            let sub = '01-sub';
            let slide1 = path.join(sub, '01-slide.md');
            let slide2 = path.join(sub, '02-slide.md');

            let items = [
                slide2,
                slide1
            ];
            expect(SlideConvert.from(items)).to.deep.eq([
                new SlideFolder(sub, [
                    new Slide(slide1),
                    new Slide(slide2)
                ])
            ]);
        });

        it ('sort slide objects in sub folders in natural order', () => {
            let sub = '01-sub';
            let slide1 = path.join(sub, '2-slide.md');
            let slide2 = path.join(sub, '10-slide.md');

            let items = [
                slide2,
                slide1
            ];
            expect(SlideConvert.from(items)).to.deep.eq([
                new SlideFolder(sub, [
                    new Slide(slide1),
                    new Slide(slide2)
                ])
            ]);
        });

        it ('sort slide objects in natural order', () => {
            let slide1 = '1-slide.md';
            let slide2 = '2-slide.md';
            let slide3 = '10-slide.md';

            let items = [
                slide1,
                slide2,
                slide3
            ];
            expect(SlideConvert.from(items)).to.deep.eq([
                new Slide(slide1),
                new Slide(slide2),
                new Slide(slide3)
            ]);
        });

        it ('sort slide folders and slides in root folder', () => {
            let slide1 = '1-slide.md';
            let slide2 = path.join('2-sub', '1-slide.md');
            let slide3 = '3-slide.md';

            let items = [
                slide1,
                slide2,
                slide3
            ];
            expect(SlideConvert.from(items)).to.deep.eq([
                new Slide(slide1),
                new SlideFolder('2-sub', [ new Slide(slide2) ]),
                new Slide(slide3)
            ]);
        });

        it ('sort slide folders and slides in root folder in natural order', () => {
            let slide1 = path.join('2-sub', '1-slide.md');
            let slide2 = '10-slide.md';

            let items = [
                slide1,
                slide2
            ];
            expect(SlideConvert.from(items)).to.deep.eq([
                new SlideFolder('2-sub', [ new Slide(slide1) ]),
                new Slide(slide2)
            ]);
        });
    });
});
