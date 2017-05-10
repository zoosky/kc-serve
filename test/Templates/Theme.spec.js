"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Theme_1 = require("../../src/template/Theme");
describe('Theme template', () => {
    it('includes css', () => {
        chai_1.expect(new Theme_1.Theme('theme').render()).to.eq('<link rel="stylesheet" href="theme/infosupport.css" id="theme">');
    });
});
//# sourceMappingURL=Theme.spec.js.map