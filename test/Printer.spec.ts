import { expect } from 'chai';
import * as path from 'path';
import * as fs from 'mz/fs';
import { Printer } from '../src/Printer';
import { Resolver } from '../src/Resolver';
import { Template } from '../src/Template';

describe('Printer', function () {

    this.timeout(10000);

    it('should output an pdf', async () => {
        const cwd = path.join(__dirname, 'test_data');
        
        await new Printer(new Template('print'), new Resolver(cwd), 3002).print('slides.pdf');
        expect(await fs.exists('slides.pdf')).to.be.true;
    });
});

