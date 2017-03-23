var should = require('should');
var template = require('../src/template');

describe('template', () => {
    it('should render', () => {
        var data = { 
            title: 'test'
        };
        template(data)().should.match(/<div class="reveal"/m);
    });

    it ('should list a slide', () => {
        var data = { 
            slides: () => [ { path: '00-intro.md' }],
            title: 'test'
        };

        template(data)().should.match(/<section data-markdown="\/slides\/00-intro.md"/m);
    })

    it ('should not nest a root-level slide', () => {
        var data = { 
            slides: () => [ { path: '00-intro.md' }],
            title: 'test'
        };

        template(data)().should.not.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    })


    it ('should nest vertical slides', () => {
        var data = { 
            slides: () => [ [ { path: '00-intro.md' } ] ],
            title: 'test'
        };

        template(data)().should.match(/<section>[\n\r\s]*<section data-markdown="\/slides\/00-intro.md"/m);
    })

    it ('should include custom css', () => {
        var data = {
            title: 'test',
            css: () => [ 'custom.css' ]
        }

        template(data)().should.match(/<link rel="stylesheet" href=\/custom_css\/custom.css>/m);
    })

    it ('should include default vs highlight theme', () => {
        var data = {
            title: 'test'
        }

        template(data)().should.match(/<link rel="stylesheet" href="\/css\/highlight\/vs.css">/m);
    })

    it ('should include specified highlight theme', () => {
        var data = {
            title: 'test',
            highlightTheme: 'zenburn'
        }

        template(data)().should.match(/<link rel="stylesheet" href="\/css\/highlight\/zenburn.css">/m);
    })
})