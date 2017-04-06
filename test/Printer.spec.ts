import 'should';
import * as path from 'path';
import { TemplateData } from './../src/TemplateData';
import { Printer } from '../src/Printer';

describe('Printer', function () {

    this.timeout(10000);

    it('should output an pdf', () => {
        var cwd = path.join(__dirname, 'test_data');

        var data: TemplateData = {
            title: 'print',
            slides: [],
            css: []
        };
        return new Printer(data, { cwd: cwd, port: 3002 }).print();
    });
});

