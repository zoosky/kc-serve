var should = require('should');
var path = require('path');
var resolve = require('../src/resolve-slides')

describe('resolveSlides', () =>{
    it('should iterate folders and files', () => {
        resolve(path.dirname(__filename))
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
})

describe('isImage', () => {
    it('png', () => {
        resolve.isImage('bower.png').should.true();
    })

    it('gif', () => {
        resolve.isImage('questionmark.gif').should.true();
    })

    it('jpg', () => {
        resolve.isImage('photo.jpg').should.true();
    })

    it('jpeg', () => {
        resolve.isImage('photo.jpeg').should.true();
    })

    it('svg', () => {
        resolve.isImage('photo.svg').should.true();
    })

    it ('zip', () => {
        resolve.isImage('demo.zip').should.false();
    })
})

