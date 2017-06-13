#!/usr/bin/env node
'use strict';

process.title = 'kc-serve';
import serve from '../src/Index';
import * as path from 'path';
const argv = require('minimist')(process.argv.slice(2));

if (!argv.help) {
    const dir = process.cwd();

    serve({
        cwd: dir,
        title: path.basename(dir),
        theme: argv.theme || 'reveal.js/css/theme/beige.css',
        highlight: argv.highlight || 'highlight.js/styles/vs.css'
    }).listen(argv.port || 0)
        .then(url => console.log('Presentation started on %s', url))
        .catch(err => console.error(err.message));
} else {
    console.log('Special folders:');
    console.log('  ./slides:\t slides (markdown, png, gif, jpg & svg)');
    console.log('  ./img:\t image files (from markdown: ![alt-text](img/your-image.jpg)');
    console.log('  ./css:\t custom css');
    console.log('');

    console.log('Options:');
    console.log('  --theme:\t resolve to reveal.js theme.');
    console.log('  --highlight:\t resolve to highlight.js style.');
    console.log('  --port:\t serve from specified port.');
    console.log('');

    console.log('Tips:');
    console.log('  * Order slides with a number prefix (you may use leading zeros but it is not required)');
    console.log('  * Group slides in subdirectories to create vertical slides: https://github.com/hakimel/reveal.js/#markup');
    console.log('  * Make image slides directly from `png`, jpg`, `gif` and `svg`');
    console.log('  * Inject custom css from the `./css` folder');
    console.log('  * Put images in an `./img` folder and refer from a markdown slide with `![alt-text](img/your-image.jpg)`');
    console.log('  * Style images from the custom-css with a selector on the alt-text `img[alt=\'alt-text\']` or filename `img[src=\'img/your-image.jpg\']`');
}