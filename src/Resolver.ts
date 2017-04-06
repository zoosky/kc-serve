import * as path from 'path';
import * as _ from 'lodash';
import * as fs from 'mz/fs';
import * as debugFn from 'debug';
import { SlideObject } from './SlideObject';

const debug = debugFn('kc:Resolver');

export class Resolver {

    private slidesDirectory: string;

    constructor(private root: string) {
        debug(root);
        this.slidesDirectory = path.join(root, 'slides');
    }

    slides() {
        if (fs.existsSync(this.slidesDirectory)) {
            return this.readTree();
        } else {
            return [];
        }
    }

    css() {
        const folder = path.join(this.root, 'css');
        if (fs.existsSync(folder)) {
            return fs.readdirSync(folder);
        } else {
            return [];
        }
    }

    async readTree(): Promise<(SlideObject | SlideObject[])[]> {
        return (await Promise.all((await fs.readdir(this.slidesDirectory)).sort()
            .map(async file => {
                if ((await fs.stat(path.join(this.slidesDirectory, file))).isDirectory()) {
                    return (await this.listSlideFiles(file))
                        .sort()
                        .map(file => new SlideObject(file))
                        .filter(Resolver.isSlide);
                } else {
                    return new SlideObject(file);
                }
            }))).filter(Resolver.isSlide);
    }

    static isSlide(slide: SlideObject | SlideObject[]) {
        return /*slide.isHtml || */Array.isArray(slide) || slide.isImage || slide.isMarkdown;
    }

    /**
     * Deeply searches for all files in a given directory
     * @param dir The directory to search (relative to slides dir)
     */
    async listSlideFiles(dir: string): Promise<string[]> {
        const files = (await fs.readdir(path.join(this.slidesDirectory, dir)))
            .map(file => path.join(dir, file));

        return _.flatMap(await Promise.all(files.map(async file => {
            const stat = await fs.stat(path.join(this.slidesDirectory, file));
            if (stat.isDirectory()) {
                return this.listSlideFiles(file);
            } else {
                return [file];
            }
        })), paths => paths).sort();
    }


    static reveal() {
        return path.resolve(require.resolve('reveal.js'), '..', '..');
    }
    static highlight() {
        return path.resolve(require.resolve('highlight.js'), '..', '..');
    }
}
