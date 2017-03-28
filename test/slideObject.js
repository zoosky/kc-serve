var slideObject = require('../src/slideObject')

describe('slideObject', () => {
    it ('should wrap a filepath into an object', () => {
        var file = '01-intro.md';
        slideObject(file).should.deepEqual({ 
            path: '01-intro.md',
            isMarkdown: true,
            isImage: false
        })
    })

    it ('should report markdown', () => {
        var file = '01-intro.md';
        slideObject(file).isMarkdown.should.true()
    })

    it ('should report not markdown for other files', () => {
        var file = '01-intro.zip';
        slideObject(file).isMarkdown.should.false()
    })

    it ('should report images', () => {
        var file = '01-intro.png';
        slideObject(file).isImage.should.true()
    })

    it ('should report not image for other files', () => {
        var file = '01-intro.pdf';
        slideObject(file).isImage.should.false()
    })
})

describe('isImage', () => {
    it('png', () => {
        slideObject.isImage('bower.png').should.true();
    })

    it('gif', () => {
        slideObject.isImage('questionmark.gif').should.true();
    })

    it('jpg', () => {
        slideObject.isImage('photo.jpg').should.true();
    })

    it('jpeg', () => {
        slideObject.isImage('photo.jpeg').should.true();
    })

    it('svg', () => {
        slideObject.isImage('photo.svg').should.true();
    })

    it ('zip', () => {
        slideObject.isImage('demo.zip').should.false();
    })
})