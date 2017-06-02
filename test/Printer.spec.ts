import { expect } from 'chai';
import * as fs from 'mz/fs';
import Printer from '../src/Printer';
import Server from '../src/Server';
import { resolve } from '../src/Printer';

describe('Printer', function () {
    this.timeout(20000);

    it('should output an pdf', async () => {
        let server = Server.create('asdf', 'print');
        let url = await server.listen(8383);

        let output = 'slides.pdf';
        if (await fs.exists(output)) {
            await fs.unlink(output);
        }

        await new Printer().print(url, output);
        await server.close();

        expect(await fs.exists(output)).to.be.true;
    });

    it('should resolve async', async () => {
        expect(await(resolve('electron-pdf'))).to.match(/electron-pdf/);
    });

    it('should throw when not found', async () => {
        try {
            await(resolve('electron-non-existing'));
            expect.fail();
        } catch (err) {
            expect(err.message).to.eq('Cannot find module \'electron-non-existing\'');
        }
    });
});

