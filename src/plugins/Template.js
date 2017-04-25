"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const reveal_1 = require("../template/reveal");
const path = require("path");
class Template {
    constructor(title, reveal, css, highlight, slides, theme) {
        this.title = title;
        this.reveal = reveal;
        this.css = css;
        this.highlight = highlight;
        this.slides = slides;
        this.theme = theme;
        this.path = '/';
    }
    relative(p) {
        return path.relative(this.path, p.path);
    }
    attach(app) {
        app.get(this.path, (_, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const context = this.CreateContext();
            res.status(200).send(reveal_1.html(yield context));
        }));
    }
    CreateContext() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return {
                slides: yield this.slides.resolve(),
                css: yield this.css.resolve(),
                title: this.title,
                highlightTheme: 'vs',
                dirs: {
                    slides: this.relative(this.slides),
                    css: this.relative(this.css),
                    theme: this.relative(this.theme),
                    reveal: this.relative(this.reveal),
                    highlight: this.relative(this.highlight)
                }
            };
        });
    }
}
exports.Template = Template;
//# sourceMappingURL=Template.js.map