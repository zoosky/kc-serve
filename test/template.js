var should = require('should');
var fs = require('fs');
var path = require('path');
var mustache = require('mustache');

describe('template', () => {
    it('should render', () => {
        var data = { 
            title: 'test'
        };
        template(data)
            .toString().should.match(/<div class="reveal"/m);
    });

    it ('should list a slide', () => {
        var data = { 
            slides: [ { path: '00-intro.md' }],
            title: 'test'
        };

        template(data)
            .toString().should.match(/<section data-markdown="slides\/00-intro.md"/m);
    })

    function template(data) {
        var f = path.join(__filename, '../../src/template/reveal.html');
        return mustache.to_html(fs.readFileSync(f).toString(), data);
    }
})