import * as path from 'path';
import { Resolver } from '../src/Resolver';
import { Slide, SlideFolder } from '../src/SlideObject';
import { expect } from 'chai';

describe('Resolver', () => {

    describe('slides', () => {

        it('should iterate folders and files', async () => {
            const slides = await new Resolver(path.join(__dirname, 'test_data')).slides();
            expect(slides).to.deep.eq([
                new Slide('00-intro.md'),
                new SlideFolder('01-sub', [
                    new Slide(path.join('01-sub', '00-title.md')),
                    new Slide(path.join('01-sub', '01-sub-folder', '01-sub-item.md')),
                    new Slide(path.join('01-sub', '02-item.png'))
                ]),
                new SlideFolder('03-natural-sort', [
                    new Slide(path.join('03-natural-sort', '1-first.md')),
                    new Slide(path.join('03-natural-sort', '9-second.md')),
                    new Slide(path.join('03-natural-sort', '12-last.md'))
                 ]),
                 new Slide('99-new.md')
            ]);
        });

        it('should not fail on no folder', async () => {
            expect(await new Resolver('asdfasdfasdf').slides()).to.deep.eq([]);
        });

        
    });


    describe('css', () => {
        it('should list css-files in the /css directory', async () => {
            const dir = path.join(__dirname, 'test_data');
            expect(await new Resolver(dir).css()).to.deep.eq(['demo.css']);
        });

        it('should not fail on no folder', async () => {
            expect(await new Resolver('asdfasdfasdf').css()).to.deep.eq([]);
        });
    });

    describe('reveal', () => {
        it('should resolve the package location of reveal.js', () => {
            expect(new Resolver('.').reveal()).to.match(/[\\/]kc-cli[\\/]node_modules[\\/]reveal.js$/g);
        });
    });

    describe('highlight', () => {
        it('should resolve the package location of highlight.js', () => {
            expect(new Resolver('.').highlight()).to.match(/[\\/]kc-cli[\\/]node_modules[\\/]highlight.js$/g);
        });
    });
});