var print = require('../src/print')
var path = require('path')
var should = require('should')

describe('print', () => {
    it ('should output an pdf', (done) => {
        var cwd = path.join(__dirname, 'test_data');

        var data = { 
            title: 'print',
            slides: () => [],
            css: () => [],
            server: {
            }
        };

        print(data, { cwd: cwd, port: 3002 }, done)
    })
})

