"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Reveal_1 = require("../../src/template/Reveal");
describe('Reveal template', () => {
    it('includes css', () => {
        chai_1.expect(new Reveal_1.Reveal.Css('reveal').render()).to.eq('<link rel="stylesheet" href="reveal/css/reveal.css">');
    });
    it('includes pdf script', () => {
        chai_1.expect(new Reveal_1.Reveal.PdfScript('/reveal').render()).to.match(/<script>.*\n.*\/\/ Printing and PDF exports\n.*var/g);
    });
    describe('main script', () => {
        it('includes head.min.js', () => {
            chai_1.expect(new Reveal_1.Reveal.MainScript('/reveal').render()).to.match(/head.min.js/g);
        });
        it('includes reveal.js', () => {
            chai_1.expect(new Reveal_1.Reveal.MainScript('/reveal').render()).to.match(/js\/reveal.js/g);
        });
    });
});
//# sourceMappingURL=Reveal.spec.js.map