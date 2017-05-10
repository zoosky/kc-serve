"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const templates = require("../../src/template/all");
describe('Template', () => {
    it('includes specified highlight theme', () => {
        // let dirs.highlight = 'css/highlight';
        // let highlightTheme = 'zenburn';
        // expect(revealTemplate.html(context)).to.match(/<link rel="stylesheet" href="css\/highlight\/zenburn.css">/m);
    });
    it('invokes extensions inside the head-element', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let head = [{ render: () => Promise.resolve('CUSTOM HEAD') }];
        let body = [];
        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        chai_1.expect(yield new templates.Index('test', head, body).render()).to.match(/<head>[\s\S]*CUSTOM HEAD[\s\S]*<\/head>/i);
    }));
    it('invokes also accepts sync extensions as head plugin', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let head = [{ render: () => 'CUSTOM HEAD' }];
        let body = [];
        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        chai_1.expect(yield new templates.Index('test', head, body).render()).to.match(/<head>[\s\S]*CUSTOM HEAD[\s\S]*<\/head>/i);
    }));
    it('invokes extensions inside the body-element', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let head = [];
        let body = [{ render: () => Promise.resolve('CUSTOM BODY') }];
        // Using \s and \S because in JavaScript the . does not match newlines (http://stackoverflow.com/a/1068308/129269)
        chai_1.expect(yield new templates.Index('test', head, body).render()).to.match(/<body>[\s\S]*CUSTOM BODY[\s\S]*<\/body>/i);
    }));
});
//# sourceMappingURL=Index.spec.js.map