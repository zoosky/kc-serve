var should = require('should');
var fs = require('fs');
var path = require('path');

describe('template', () => {
    it('should render', () => {
        var t = path.join(__filename, '../../src/template/reveal.html');
        var template = fs.readFileSync(t);

        template.toString().should.match(/<div class="reveal"/m);
    })
})