const resolveBin = require('resolve-bin');
const spawn = require('spawn-please');
export default class {
    async print(url: string, file: string) {
        const electronpdf = await resolve('electron-pdf');
        await spawn('node', [electronpdf, `${url}?print-pdf`, file]);
    }
}

export function resolve(name: string) {
    return new Promise((resolve, reject) => resolveBin(name, (error: Error, bin: string) => {
        if (error) {
            reject(error);
        }
        resolve(bin);
    }));
}