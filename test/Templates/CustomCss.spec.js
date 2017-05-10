"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const CustomCss_1 = require("../../src/template/CustomCss");
describe('Css template', () => {
    it('includes custom css', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let css = ['custom.css'];
        let resolver = { resolve: () => Promise.resolve(css) };
        chai_1.expect(yield new CustomCss_1.CustomCss(resolver, 'css').render()).to.match(/<link rel="stylesheet" href="css\/custom.css">/m);
    }));
    it('includes multiple css', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let css = ['custom.css', 'another.css'];
        let resolver = { resolve: () => Promise.resolve(css) };
        chai_1.expect(yield new CustomCss_1.CustomCss(resolver, 'css').render()).to.match(/.*custom.css".*\n.*another.css">/m);
    }));
    it('matches css dir with template', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let css = ['custom.css'];
        let resolver = { resolve: () => Promise.resolve(css) };
        chai_1.expect(yield new CustomCss_1.CustomCss(resolver, 'adsfasdf').render()).to.contain('href="adsfasdf/custom.css"');
    }));
});
//# sourceMappingURL=CustomCss.spec.js.map