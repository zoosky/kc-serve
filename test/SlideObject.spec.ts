import * as path from 'path';
import { expect } from 'chai';
import { SlideObject } from '../src/SlideObject';

describe('SlideObject', () => {
    it('should wrap a file into an object', () =>
        expect(new SlideObject('01-intro.md').file).to.eq('01-intro.md'));

    it('should report markdown', () => {
        expect(new SlideObject('01-intro.md').isMarkdown).to.be.true;
    });

    it('should report not markdown for other files', () => {
        expect(new SlideObject('01-intro.zip').isMarkdown).to.be.false;
    });

    it('should report images', () => {
        expect(new SlideObject('01-intro.png').isImage).to.be.true;
    });

    it('should report not image for other files', () => {
        expect(new SlideObject('01-intro.pdf').isImage).to.be.false;
    });

    describe('isImage', () => {

        ['bower.png', 'questionmark.gif', 'photo.jpg', 'photo.jpeg', 'photo.svg'].forEach(file => {
            it(`${path.extname(file)} should be an image`, () => expect(new SlideObject(file).isImage).to.be.true);
        });

        it('zip should not be an image', () => {
            expect(new SlideObject('demo.zip').isImage).to.be.false;
        });
    });
});
