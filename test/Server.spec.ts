import * as request from 'supertest';
import * as path from 'path';
import { Server } from '../src/Server';
import { expect } from 'chai';
import { Resolver } from '../src/Resolver';
import { Template } from '../src/Template';
import * as fs from 'mz/fs';

describe('Server', () => {

    describe('loading express', () => {
        let server: Server;
        let resolver: Resolver;

        beforeEach(() => {
            delete require.cache[require.resolve('../src/Server')];

            const cwd = path.join(__dirname, 'test_data');
            resolver = new Resolver(cwd);

            server = new Server(
                new Template('test'),
                resolver,
                8384);
            return server.listen();
        });

        afterEach(() => {
            return server.close();
        });

        it('serves template to /', (done) => {
            request(server.server)
                .get('/')
                .expect( (res: request.Response) => {
                    expect(res.text).to.match(/Reveal\.initialize\(options\)/mgi);
                    expect(res.text).to.match(/\<title\>test\<\/title\>/mgi);
                })
                .expect(200, done);
        });

        it('serves reveal files to /reveal', done => {
            request(server.server)
                .get('/reveal/css/reveal.css')
                .expect((res: request.Response) => expect(res.text).to.match(/html, body, .reveal div/m))
                .expect(200, done);
        });

        it('serves highlight files to /highlight', done => {
            request(server.server)
                .get('/css/highlight/vs.css')
                .expect((res: request.Response) => expect(res.text).to.match(/Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>/m))
                .expect(200, done);
        });

        it('serves theme files to /theme', done => {
            request(server.server)
                .get('/theme/infosupport.css')
                .expect((res: request.Response) => expect(res.text).to.match(/Info Support theme for reveal.js presentations/m))
                .expect(200, done);
        });

        it('serves slides to /slides', done => {
            request(server.server)
                .get('/slides/00-intro.md')
                .expect((res: request.Response) => expect(res.text).to.match(/# title/m))
                .expect(200, done);
        });

        it ('includes new slides on new request', async () => {
            let file = path.join(resolver.dirs.slides(), '99-new.md');

            await fs.unlink(file);
            await request(server.server)
                .get('/')
                .expect((res: request.Response) => expect(res.text).to.not.match(/99-new.md/m));
            
            await fs.close(await fs.open(file, 'w'));
            await request(server.server)
                .get('/')
                .expect((res: request.Response) => expect(res.text).to.match(/99-new.md/m));
        });

        it('serves img to /img', done => {
            request(server.server)
                .get('/img/plaatje.jpg')
                .expect(200, done);
        });

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
            const server = new Server(
                new Template('test'),
                new Resolver('asdfasdf'),
                8385);
            const address = await server.listen();
            expect(address).to.be.eq('http://localhost:8385/');
            return server.close();
        });
    });
});