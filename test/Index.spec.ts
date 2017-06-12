import { expect } from 'chai';
import * as request from 'supertest';
import * as path from 'path';
import create from '../src/Index';
import Server from '../src/Server';

describe('Index', () => {
    let server: Server;

    before(async () => {
        const cwd = path.join(__dirname, 'test_data');

        server = create({ cwd: cwd, title: 'all-for-one', theme: 'reveal.js/css/theme/beige.css', highlight: 'highlight.js/styles/vs.css' });
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
            .expect((res: request.Response) => expect(res.text).to.match(/beige.css/m))
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
                .get('/theme/beige.css')
                .expect(200);
        });

        it('reveal', async () => {
            await request(server.server)
                .get('/reveal/js/reveal.js')
                .expect(200);
        });
    });
});