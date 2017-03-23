// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

var request = require('supertest');
var should = require('should');
var path = require('path');
var debug = require('debug')('test');

describe('loading express', () => {
    var server;

    beforeEach(() => {
        delete require.cache[require.resolve('../src/server')];

        var slides = path.join(__filename, '..', 'slides');
        server = require('../src/server')(() => "# demo", slides);
    });
    afterEach((done) => {
        server.close(done);
    });

    it('serves template to /', (done) => {
        request(server)
            .get('/')
            .expect(res => debug(res))
            .expect(res => res.text.should.match(/# demo/m))
            .expect(200, done);
    });

    it ('serves reveal files to /reveal', done => {
        request(server)
            .get('/reveal/css/reveal.css')
            .expect(res => debug(res))
            .expect(res => res.text.should.match(/html, body, .reveal div/m))
            .expect(200, done);
    });

    it ('serves highlight files to /highlight', done => {
        request(server)
            .get('/css/highlight/vs.css')
            .expect(res => debug(res))
            .expect(res => res.text.should.match(/Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>/m))
            .expect(200, done);
    });

    it ('serves theme files to /theme', done => {
        request(server)
            .get('/theme/infosupport.css')
            .expect(res => debug(res))
            .expect(res => res.text.should.match(/Info Support theme for reveal.js presentations/m))
            .expect(200, done);
    });

    it ('serves slides to /slides', done => {
        request(server)
            .get('/slides/00-intro.md')
            .expect(res => res.text.should.match(/# title/m))
            .expect(200, done);
    })

    it('404 everything else', (done) => {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});