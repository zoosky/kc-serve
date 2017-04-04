import 'should';
import * as path from 'path';
import { Resolver } from '../src/Resolver';
import { SlideObject } from '../src/SlideObject';
import { expect } from 'chai';

describe('Resolver', () => {

    describe('slides', () => {

        it('should iterate folders and files', async () => {
            const slides = await new Resolver(path.join(__dirname, 'test_data')).slides();
            expect(slides).to.deep.eq([ 
                new SlideObject('00-intro.md'),
                [
                    new SlideObject(path.join('01-sub', '00-title.md')),
                    new SlideObject(path.join('01-sub', '01-item.png'))
                ]
            ]);
        });

        it('should not fail on no folder', () => {
            new Resolver('asdfasdfasdf').slides();
        });
    });


    describe('css', () => {
        it('should list css-files in the /css directory', () => {
            var dir = path.join(__dirname, 'test_data');
            expect(new Resolver(dir).css()).to.deep.eq(['demo.css']);
        });

        it('should not fail on no folder', () => {
            new Resolver('asdfasdfasdf').css();
        });
    });

    describe('reveal', () => {
        it('should resolve the package location of reveal.js', () => {
            Resolver.reveal().should.match(/[\\/]kc-cli[\\/]node_modules[\\/]reveal.js$/g)
        });
    });

    describe('highlight', () => {
        it('should resolve the package location of highlight.js', () => {
            Resolver.highlight().should.match(/[\\/]kc-cli[\\/]node_modules[\\/]highlight.js$/g)
        });
    });
});