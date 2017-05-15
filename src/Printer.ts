import * as path from 'path';
const spawn = require('cross-spawn');
import { Reveal } from './plugins/Reveal';
const debug = require('debug')('kc:print');

export class Printer {

    constructor(private reveal: Reveal) {
    }

    async print(url: string, file: string) {
        const plugin = path.join(this.reveal.root, 'plugin', 'print-pdf', 'print-pdf.js');
        const cp = spawn('phantomjs', [plugin, `${url}?print-pdf`, file]);

        return new Promise<void>(resolve => {
            cp.stdout.on('data', async (data: Buffer | string) => {
                debug(data);
                if (data.toString().match(/Export PDF: Finished successfully!/g)) {
                    resolve();
                }
            });
        });
    }
}