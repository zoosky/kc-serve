#!/usr/bin/env node
'use strict';

process.title = 'kc';
import serve from '../src/Index';
import * as path from 'path';
import * as program from 'commander';

program
    .version(require('../package.json').version);
    
interface Options {
    theme: string;
    highlight: string;
    port: number;
}

program
    .command('serve')
    .option('-t, --theme <theme>', 'resolve to reveal.js theme')
    .option('-h, --highlight <style>', 'resolve to highlight.js style')
    .option('-p, --port <port>', 'serve presentation on specified port')
    .action(async (options: Options) => {
        const dir = process.cwd();
        
        console.log(options);

        try {
            const url = await serve({
                cwd: dir,
                title: path.basename(dir),
                theme: options.theme || 'reveal.js/css/theme/beige.css',
                highlight: options.highlight || 'highlight.js/styles/vs.css'
            }).listen(options.port || 0);

            console.log('Presentation started on %s', url);
        }
        catch (err) {
            console.error(err.message);
        }
    });

program.parse(process.argv);