"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const fs = require("mz/fs");
const express = require("express");
class Css {
    constructor(cwd) {
        this.path = '/css';
        this.root = path.join(cwd, 'css');
    }
    resolve() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (yield fs.exists(this.root)) ?
                fs.readdir(this.root) :
                Promise.resolve([]);
        });
    }
    attach(app) {
        app.use(this.path, express.static(this.root));
    }
}
exports.Css = Css;
//# sourceMappingURL=Css.js.map