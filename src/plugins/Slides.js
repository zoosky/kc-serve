"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const express = require("express");
const fs = require("mz/fs");
const SlideObject_1 = require("../SlideObject");
const walk = require('walkdir');
class Slides {
    constructor(cwd) {
        this.path = '/slides';
        this.root = path.join(cwd, 'slides');
    }
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield fs.exists(this.root)) ?
                Slides.readTree(this.root) :
                Promise.resolve([]);
        });
    }
    static readTree(dir) {
        return new Promise((resolve, reject) => {
            let items = new Array();
            let emitter = walk(dir);
            emitter.on('file', (name, _stat) => items.push(path.relative(dir, name)));
            emitter.on('end', () => resolve(SlideObject_1.SlideConvert.from(items)));
            emitter.on('error', reject);
        });
    }
    attach(app) {
        app.use(this.path, express.static(this.root));
    }
}
exports.Slides = Slides;
//# sourceMappingURL=Slides.js.map