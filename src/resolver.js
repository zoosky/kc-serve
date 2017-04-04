"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const debugFn = require("debug");
const _ = require("lodash");
const fs = require("mz/fs");
const SlideObject_1 = require("./SlideObject");
const debug = debugFn('kc:Resolver');
class Resolver {
    constructor(root) {
        this.root = root;
        debug(root);
        this.slidesDirectory = path.join(root, 'slides');
    }
    slides() {
        if (fs.existsSync(this.slidesDirectory)) {
            const items = this.readTree();
            return items;
        }
    }
    ;
    css() {
        var folder = path.join(this.root, 'css');
        if (fs.existsSync(folder)) {
            return fs.readdirSync(folder);
        }
        return [];
    }
    readTree() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Promise.all((yield fs.readdir(this.slidesDirectory))
                .map((file) => __awaiter(this, void 0, void 0, function* () {
                if ((yield fs.stat(path.join(this.slidesDirectory, file))).isDirectory()) {
                    return (yield this.listSlideFiles(file))
                        .map(file => new SlideObject_1.SlideObject(file))
                        .filter(Resolver.isSlide);
                }
                else {
                    return new SlideObject_1.SlideObject(file);
                }
            })))).filter(Resolver.isSlide);
        });
    }
    static isSlide(slide) {
        return Array.isArray(slide) || slide.isImage || slide.isMarkdown;
    }
    /**
     * Deeply searches for all files in a given directory
     * @param dir The directory to search (relative to slides dir)
     */
    listSlideFiles(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = (yield fs.readdir(path.join(this.slidesDirectory, dir)))
                .map(file => path.join(dir, file));
            return _.flatMap(yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const stat = yield fs.stat(path.join(this.slidesDirectory, file));
                if (stat.isDirectory()) {
                    return this.listSlideFiles(file);
                }
                else {
                    return [file];
                }
            }))), paths => paths);
        });
    }
    static reveal() {
        return path.resolve(require.resolve('reveal.js'), '..', '..');
    }
    static highlight() {
        return path.resolve(require.resolve('highlight.js'), '..', '..');
    }
}
exports.Resolver = Resolver;
//# sourceMappingURL=Resolver.js.map