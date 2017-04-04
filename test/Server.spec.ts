import * as request from 'supertest';
import * as should from 'should';
import * as path from 'path';
import * as sinon from 'sinon';
import * as http from 'http';
import { Server } from '../src/Server';
import { expect } from 'chai';

describe('Server', () => {

    describe('loading express', () => {
        let server: Server;

        beforeEach(() => {
            delete require.cache[require.resolve('../src/Server')];

            var cwd = path.join(__dirname, 'test_data');
            server = new Server({ title: 'test', slides: [], css: [], server: {} },
                { cwd: cwd, port: 8384 });
            return server.listen();
        });

        afterEach(() => {
            return server.close();
        });

        it('serves template to /', (done) => {
            request(server.server)
                .get('/')
                .expect(res => {
                    res.text.should.match(/Reveal\.initialize\(options\)/mgi);
                    res.text.should.match(/\<title\>test\<\/title\>/mgi);
                })
                .expect(200, done);
        });

        it('serves reveal files to /reveal', done => {
            request(server.server)
                .get('/reveal/css/reveal.css')
                .expect(res => res.text.should.match(/html, body, .reveal div/m))
                .expect(200, done);
        });

        it('serves highlight files to /highlight', done => {
            request(server.server)
                .get('/css/highlight/vs.css')
                .expect(res => res.text.should.match(/Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>/m))
                .expect(200, done);
        });

        it('serves theme files to /theme', done => {
            request(server.server)
                .get('/theme/infosupport.css')
                .expect(res => res.text.should.match(/Info Support theme for reveal.js presentations/m))
                .expect(200, done);
        });

        it('serves slides to /slides', done => {
            request(server.server)
                .get('/slides/00-intro.md')
                .expect(res => res.text.should.match(/# title/m))
                .expect(200, done);
        })

        it('serves img to /img', done => {
            request(server.server)
                .get('/img/plaatje.jpg')
                .expect(200, done);
        })

        it('serves css files to /css', done => {
            request(server.server)
                .get('/css/demo.css')
                .expect(200, done);
        });

        it('404 everything else', (done) => {
            request(server.server)
                .get('/foo/bar')
                .expect(404, done);
        });
    });

    describe('initializing server', () => {
        it('should resolve the promise ', async () => {
            const server = new Server({ title: 'test', server: {}, slides: [], css: [] },
                { cwd: '.', port: 8385 });
            const address = await server.listen();
            expect(address).to.be.eq('http://localhost:8385/');
            return server.close();
        });
    });
});