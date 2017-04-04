import 'should';
import * as path from 'path';
import { SlideObject } from './../src/SlideObject';
import { TemplateData } from './../src/TemplateData';
import { Printer } from '../src/Printer';

describe('Printer', () => {

    beforeEach(function(){
        this.timeout(5000);
    });

    it ('should output an pdf', () => {
        var cwd = path.join(__dirname, 'test_data');

        var data: TemplateData = { 
            title: 'print',
            slides: [],
            css: [],
            server: {
            }
        };
        return new Printer(data, { cwd: cwd, port: 3002 }).print();
    });
});

