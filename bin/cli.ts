#!/usr/bin/env node
'use strict';

process.title = 'kc-serve';
import serve from '../src/Index';
import * as path from 'path';
import * as opn from 'opn';
const debug = require('debug')('kc:cli');

const argv = require('minimist')(process.argv.slice(2), {
    string: ['theme', 'highlight'],
    boolean: ['open', 'help'],
    number: ['port'],
    alias: {
        t: 'theme',
        h: 'highlight',
        o: 'open',
        p: 'port'
    },
    default: {
        open: true,
        theme: 'reveal.js/css/theme/simple.css',
        highlight: 'darkula.css',
        port: 0
    }
});
debug(argv);

if (!argv.help) {
    start(argv.theme, argv.highlight, argv.port, argv.open);
} else {
    usage();
}

function start(theme: string, highlight: string, port: number, open: boolean) {
    const dir = process.cwd();

    try {
        serve({
            cwd: dir,
            title: path.basename(dir),
            theme: theme,
            highlight: highlight
        }).listen(port)
            .then(url => {
                console.log('Presentation started on %s', url);
                if (open) {
                    opn(url);
                }
            })
            .catch(err => console.error(err.message));
    } catch (err) {
        console.error(err.message);
    }
}

function usage() {
    console.log(`
Special folders:
  ./slides:\t slides (markdown, png, gif, jpg & svg)
  ./img:\t image files (from markdown: ![alt-text](img/your-image.jpg)
  ./css:\t custom css

Options:
  --theme:\t resolve to reveal.js theme
  --highlight:\t resolve to highlight.js style
  --port:\t serve from specified port
  --no-open:\t don't open presentation in browser

  * Pick a highlight style from https://highlightjs.org/static/demo/
    or use the css file name from https://github.com/isagalaev/highlight.js/tree/master/src/styles

  * Use a default reveal.js theme: black, white, league, beige, sky, night, serif, simple or solarized (see: https://github.com/hakimel/reveal.js#theming)
    or use a package containing a custom theme (it should resolve to the css via 'main' or explicitly),
    or override (parts of) a theme with a custom css in the ./css folder

Tips:
  * Order slides with a number prefix (leading zeros may be omitted)
  * Group slides in subdirectories to create vertical slides, see: https://github.com/hakimel/reveal.js/#markup
  * Make image slides directly from 'png', jpg', 'gif' and 'svg'
  * Inject custom css in the './css' folder
  * Put images in the './img' folder and include from a markdown slide using '![alt-text](img/your-image.jpg)'
  * Style images from custom-css with a selector on the alt-text 'img[alt='alt-text']' or filename 'img[src='img/your-image.jpg']'
`);
}