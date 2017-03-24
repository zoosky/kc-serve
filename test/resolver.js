var should = require('should');
var path = require('path');
var resolver = require('../src/resolver')

describe('resolverSlides', () =>{
    it('should iterate folders and files', () => {
        resolver.slides(path.join(__dirname, 'test_data'))
            .should.deepEqual([ 
                { 
                    isImage: false,
                    path: '00-intro.md' 
                }, 
                [
                    {
                        isImage: false,
                        path: '01-sub/00-title.md'
                    },
                    {
                        isImage: true,
                        path: '01-sub/01-item.png'
                    }
                ]]);
    })

    it ('should not fail on no folder', () => {
        resolver.slides('asdfasdfasdf');
    })
})

describe('isImage', () => {
    it('png', () => {
        resolver.isImage('bower.png').should.true();
    })

    it('gif', () => {
        resolver.isImage('questionmark.gif').should.true();
    })

    it('jpg', () => {
        resolver.isImage('photo.jpg').should.true();
    })

    it('jpeg', () => {
        resolver.isImage('photo.jpeg').should.true();
    })

    it('svg', () => {
        resolver.isImage('photo.svg').should.true();
    })

    it ('zip', () => {
        resolver.isImage('demo.zip').should.false();
    })
})

describe('resolver-css', () => {
    it('should list css-files in the /css directory', () => {
        var dir = path.join(__dirname, 'test_data');
        resolver.css(dir).should.deepEqual(['demo.css']);
    })

    it ('should not fail on no folder', () => {
        resolver.css('asdfasdfasdf');
    })
})

