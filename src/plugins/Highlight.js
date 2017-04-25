"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
class Highlight {
    constructor() {
        this.path = '/css/highlight';
        let base = path.resolve(require.resolve('highlight.js'), '..', '..');
        this.root = path.join(base, 'styles');
    }
    attach(app) {
        app.use(this.path, express.static(this.root));
    }
}
exports.Highlight = Highlight;
//# sourceMappingURL=Highlight.js.map