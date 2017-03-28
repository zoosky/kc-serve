var should = require('should');
var path = require('path');
var resolver = require('../src/resolver')
var slideObject = require('../src/slideObject')

describe('resolver-slides', () =>{
    it('should iterate folders and files', () => {
        resolver(path.join(__dirname, 'test_data')).slides()
            .should.deepEqual([ 
                slideObject('00-intro.md'), 
                [
                    slideObject(path.join('01-sub', '00-title.md')),
                    slideObject(path.join('01-sub', '01-item.png'))
                ]
            ]);
    })

    it ('should not fail on no folder', () => {
        resolver('asdfasdfasdf').slides();
    })
})

describe('resolver-css', () => {
    it('should list css-files in the /css directory', () => {
        var dir = path.join(__dirname, 'test_data');
        resolver(dir).css().should.deepEqual(['demo.css']);
    })

    it ('should not fail on no folder', () => {
        resolver('asdfasdfasdf').css();
    })
})

describe('resolver-reveal', () => {
    it ('should resolve the package location of reveal.js', () => {
        resolver.reveal().should.match(/[\\/]kc-cli[\\/]node_modules[\\/]reveal.js$/g)
    })
})

describe('resolver-highlight', () => {
    it ('should resolve the package location of highlight.js', () => {
        resolver.highlight().should.match(/[\\/]kc-cli[\\/]node_modules[\\/]highlight.js$/g)

    })
})