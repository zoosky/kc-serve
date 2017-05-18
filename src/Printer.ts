const electronpdf = require.resolve('electron-pdf/cli.js');
const spawn = require('spawn-please');
export class Printer {
    async print(url: string, file: string) {
        return spawn('node', [electronpdf, `${url}?print-pdf`, file]);
    }
}