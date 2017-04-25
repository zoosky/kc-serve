"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
class Reveal {
    constructor() {
        this.path = '/reveal';
        this.root = path.resolve(require.resolve('reveal.js'), '..', '..');
    }
    attach(app) {
        app.use(this.path, express.static(this.root));
    }
}
exports.Reveal = Reveal;
//# sourceMappingURL=Reveal.js.map