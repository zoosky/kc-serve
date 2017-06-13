#!/usr/bin/env node
'use strict';

process.title = 'kc-serve';
import serve from '../src/Index';
import * as path from 'path';
const argv = require('minimist')(process.argv.slice(2));

if (!argv.help) {
    start(argv.theme, argv.highlight, argv.port);
} else {
    usage();
}

function start(theme: string, highlight: string, port: number) {
    const dir = process.cwd();

    try {
        serve({
            cwd: dir,
            title: path.basename(dir),
            theme:  theme || 'reveal.js/css/theme/simple.css',
            highlight: highlight || 'highlight.js/styles/darkula.css'
        }).listen(port || 0)
            .then(url => console.log('Presentation started on %s', url))
            .catch(err => console.error(err.message));
    } catch (err) {
        console.error(err.message);
    }
}

function usage() {
    console.log('Special folders:');
    console.log('  ./slides:\t slides (markdown, png, gif, jpg & svg)');
    console.log('  ./img:\t image files (from markdown: ![alt-text](img/your-image.jpg)');
    console.log('  ./css:\t custom css');
    console.log('');

    console.log('Options:');
    console.log('  --theme:\t resolve to reveal.js theme');
    console.log('  --highlight:\t resolve to highlight.js style');
    console.log('  --port:\t serve from specified port');
    console.log('');
    console.log('  Pick a highlight style from https://highlightjs.org/static/demo/,');
    console.log('    or use the css file name from https://github.com/isagalaev/highlight.js/tree/master/src/styles');
    console.log('');
    console.log('  Use a default reveal.js theme: black, white, league, beige, sky, night, serif, simple or solarized');
    console.log('      see: https://github.com/hakimel/reveal.js#theming');
    console.log('    or specify a package containing a custom theme,');
    console.log('    or override (parts of) a theme with a custom css in the ./css folder');
    console.log('');

    console.log('Tips:');
    console.log('  * Order slides with a number prefix (you may use leading zeros but it is not required)');
    console.log('  * Group slides in subdirectories to create vertical slides, see: https://github.com/hakimel/reveal.js/#markup');
    console.log('  * Make image slides directly from `png`, jpg`, `gif` and `svg`');
    console.log('  * Inject custom css from the `./css` folder');
    console.log('  * Put images in an `./img` folder and include in a markdown slide with `![alt-text](img/your-image.jpg)`');
    console.log('  * Style images from custom-css with a selector on the alt-text `img[alt=\'alt-text\']` or filename `img[src=\'img/your-image.jpg\']`');
}