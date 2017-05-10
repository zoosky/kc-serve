import { expect } from 'chai';
import { Reveal } from '../../src/template/Reveal';

describe('Reveal template', () => {
    it('includes css', () => {
        expect(new Reveal.Css('reveal').render()).to.eq('<link rel="stylesheet" href="reveal/css/reveal.css">');
    });

    it ('includes pdf script', () => {
        expect (new Reveal.PdfScript('/reveal').render()).to.match(/<script>.*\n.*\/\/ Printing and PDF exports\n.*var/g);
    });

    describe('main script', () => {
        it ('includes head.min.js', () => {
            expect (new Reveal.MainScript('/reveal').render()).to.match(/head.min.js/g);
        });

        it ('includes reveal.js', () => {
            expect (new Reveal.MainScript('/reveal').render()).to.match(/js\/reveal.js/g);
        });
    });
});