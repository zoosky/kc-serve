import Server from '../src/Server';
import { expect } from 'chai';
import * as request from 'supertest';
import * as path from 'path';

describe('Server', () => {
    describe('initializing server', () => {
        it('should resolve the promise ', async () => {
            const server = new Server([]);
            const address = await server.listen(8885);
            expect(address).to.be.eq('http://localhost:8885/');
            return server.close();
        });

        it('open same port twice', async () => {
            const server1 = new Server([]);
            const server2 = new Server([]);

            await server1.listen(8889);
            try {
                await server2.listen(8889);
                expect.fail();
            }
            catch (err) {
                expect(err.toString()).to.eq('Error: listen EADDRINUSE :::8889');
            }
            finally {
                await server1.close();
            }
        });
    });

    describe('close', () => {
        it('stops listening', async () => {
            const server = new Server([]);
            await server.listen(8885);

            await server.close();
            expect(server.server.listening).to.be.false;
        });
    });

    describe('create', () => {
        let server: Server;

        before(async () => {
            const cwd = path.join(__dirname, 'test_data');

            server = Server.create(cwd, 'all-for-one');
            await server.listen(0);
        });

        after(async () => {
            await server.close();
        });

        it('includes all template parts', async () => {
            await request(server.server)
                .get('/')
                .expect(200)
                .expect((res: request.Response) => expect(res.text).to.match(/demo.css/m))
                .expect((res: request.Response) => expect(res.text).to.match(/00-title.md/m))
                .expect((res: request.Response) => expect(res.text).to.match(/infosupport.css/m))
                .expect((res: request.Response) => expect(res.text).to.match(/\js\/reveal.js/m))
                .expect((res: request.Response) => expect(res.text).to.match(/\/css\/print\/pdf.css/m));
        });

        describe('plugins includes', () => {
            it('img', async () => {
                await request(server.server)
                    .get('/img/plaatje.jpg')
                    .expect(200);
            });

            it('slides', async () => {
                await request(server.server)
                    .get('/slides/00-intro.md')
                    .expect(200);
            });

            it('highlight', async () => {
                await request(server.server)
                    .get('/css/highlight/vs.css')
                    .expect(200);
            });

            it('theme', async () => {
                await request(server.server)
                    .get('/theme/infosupport.css')
                    .expect(200);
            });

            it('reveal', async () => {
                await request(server.server)
                    .get('/reveal/js/reveal.js')
                    .expect(200);
            });
        });
    });
});