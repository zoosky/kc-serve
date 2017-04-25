import * as path from 'path';
import { Server } from './Server';
const spawn = require('cross-spawn');
import { Reveal } from './plugins/Reveal';

export class Printer {

    constructor(private server: Server, private reveal: Reveal) {
    }

    async print(file: string) {
        const url = await this.server.listen();
        const plugin = path.join(this.reveal.root, 'plugin', 'print-pdf', 'print-pdf.js');
        const cp = spawn('phantomjs', [plugin, `${url}?print-pdf`, file]);

        return new Promise<void>(resolve => {
            cp.stdout.on('data', async (data: Buffer | string) => {
                if (data.toString().match(/Export PDF: Finished successfully!/g)) {
                    resolve();
                }
            });
        });
    }
}