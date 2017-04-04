"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const dir = path.join(__dirname, 'template');
const html = path.join(dir, 'reveal.html');
const slide = path.join(dir, 'slide.html');
handlebars.registerPartial("slide", fs.readFileSync(slide).toString());
const template = handlebars.compile(fs.readFileSync(html).toString());
class Template {
    constructor(data) {
        this.data = data;
        this.data.highlightTheme = this.data.highlightTheme || 'vs';
    }
    compile() {
        return template(this.data);
    }
}
exports.Template = Template;
//# sourceMappingURL=Template.js.map