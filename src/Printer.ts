const electronpdf = require.resolve('electron-pdf/cli.js');
const spawn = require('spawn-please');
export default class {
    async print(url: string, file: string) {
        return spawn('node', [electronpdf, `${url}?print-pdf`, file]);
    }
}