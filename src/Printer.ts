import * as path from 'path';
import { Server } from './Server';
import { Resolver } from './Resolver';
const spawn = require('cross-spawn');
import { Template } from './Template';

export class Printer {

    constructor(private template: Template, private resolver: Resolver, private port: number) {
    }

    async print(file: string) {
        const server = new Server(this.template, this.resolver, this.port);
        const url = await server.listen();
        const plugin = path.join(this.resolver.reveal(), 'plugin', 'print-pdf', 'print-pdf.js');
        const cp = spawn('phantomjs', [plugin, `${url}?print-pdf`, file]);

        return new Promise<void>(resolve => {
            cp.stdout.on('data', async (data: Buffer | string) => {
                if (data.toString().match(/Export PDF: Finished successfully!/g)) {
                    resolve();
                }
            });
        }).then(() => server.close());
    }
}