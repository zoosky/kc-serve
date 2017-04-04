import * as path from 'path';
import * as spawn from 'cross-spawn';
import * as template from './Template';
import { Server } from './Server';
import { TemplateData } from './TemplateData';
import { Options } from './Options';
import { Resolver } from './Resolver';

export class Printer {

    constructor(private data: TemplateData, private options: Options) {
    }

    async print() {
        var server = new Server(this.data, this.options);
        const url = await server.listen();
        var plugin = path.join(Resolver.reveal(), 'plugin', 'print-pdf', 'print-pdf.js')
        var cp = spawn('phantomjs', [plugin, `${url}?print-pdf`, 'slides.pdf']);

        return new Promise<void>((resolve, reject) => {
            cp.stdout.on('data', async (data) => {
                if (data.toString().match(/Export PDF: Finished successfully!/g)) {
                    resolve();
                }
            });
        }).then(() => server.close());
    }
}