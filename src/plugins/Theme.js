"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
class Theme {
    constructor() {
        this.path = '/theme';
        this.root = path.join(__dirname, '..', 'theme');
    }
    attach(app) {
        app.use(this.path, express.static(this.root));
    }
}
exports.Theme = Theme;
//# sourceMappingURL=Theme.js.map