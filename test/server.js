// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

var request = require('supertest');
var should = require('should');
var debug = require('debug')('test');

describe('loading express', () => {
    var server;

    beforeEach(() => {
        delete require.cache[require.resolve('../src/server')];
        server = require('../src/server')("# demo");
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

    it('404 everything else', (done) => {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
});