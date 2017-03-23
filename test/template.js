var should = require('should');
var template = require('../src/template');

describe('template', () => {
    it('should render', () => {
        var data = { 
            title: 'test'
        };
        template(data).should.match(/<div class="reveal"/m);
    });

    it ('should list a slide', () => {
        var data = { 
            slides: () => [ { path: '00-intro.md' }],
            title: 'test'
        };

        template(data).should.match(/<section data-markdown="slides\/00-intro.md"/m);
    })


    it ('should nest vertical slides', () => {
        var data = { 
            slides: () => [ [ { path: '00-intro.md' } ] ],
            title: 'test'
        };

        template(data).should.match(/<section>[\n\r\s]*<section data-markdown="slides\/00-intro.md"/m);
    })

    it ('should include custom css', () => {
        var data = {
            title: 'test',
            css: () => [ 'custom.css' ],
            base: 'http://localhost'
        }

        template(data).should.match(/<link rel="stylesheet" href=http:\/\/localhost\/custom_css\/custom.css>/m);
    })

    it ('should include default vs highlight theme', () => {
        var data = {
            title: 'test',
            base: 'http://localhost'
        }

        template(data).should.match(/<link rel="stylesheet" href="http:\/\/localhost\/css\/highlight\/vs.css">/m);
    })

    it ('should include specified highlight theme', () => {
        var data = {
            title: 'test',
            base: 'http://localhost',
            highlightTheme: 'zenburn'
        }

        template(data).should.match(/<link rel="stylesheet" href="http:\/\/localhost\/css\/highlight\/zenburn.css">/m);
    })
})