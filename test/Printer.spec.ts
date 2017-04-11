import 'should';
import * as path from 'path';
const fs = require('fs-extra');
import { TemplateData } from './../src/TemplateData';
import { Printer } from '../src/Printer';

describe('Printer', function () {

    this.timeout(10000);

    it('should output an pdf', async () => {
        const cwd = path.join(__dirname, 'test_data');

        const data: TemplateData = {
            title: 'print',
            slides: [],
            css: []
        };
        
        await new Printer(data, { cwd: cwd, port: 3002 }).print();
        fs.existsSync('slides.pdf').should.true();
    });
});

