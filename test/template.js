var should = require('should');
var template = require('../src/template');

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
            slides: () => [ { path: '00-intro.md' }],
            title: 'test'
        };

        template(data)
            .toString().should.match(/<section data-markdown="slides\/00-intro.md"/m);
    })


    it ('should nest vertical slides', () => {
        var data = { 
            slides: () => [ [ { path: '00-intro.md' } ] ],
            title: 'test'
        };

        template(data)
            .toString().should.match(/<section>[\n\r\s]*<section data-markdown="slides\/00-intro.md"/m);
    })
})