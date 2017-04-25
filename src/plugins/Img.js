"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
class Img {
    constructor(cwd) {
        this.path = '/img';
        this.root = path.join(cwd, 'img');
    }
    attach(app) {
        app.use(this.path, express.static(this.root));
    }
}
exports.Img = Img;
//# sourceMappingURL=Img.js.map