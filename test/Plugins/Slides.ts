import * as path from 'path';
import plugin from '../../src/plugins/Slides';
import { Slide, SlideFolder } from '../../src/SlideObject';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('slides', () => {
    describe('resolve', () => {
        it('iterates folders and files', async () => {
            const slides = await new plugin(path.join(__dirname, '..', 'test_data')).resolve();
            expect(slides).to.deep.eq([
                new Slide('00-intro.md'),
                new SlideFolder('01-sub', [
                    new Slide(path.join('01-sub', '00-title.md')),
                    new Slide(path.join('01-sub', '01-sub-folder', '01-sub-item.md')),
                    new Slide(path.join('01-sub', '02-item.png'))
                ]),
                new SlideFolder('03-natural-sort', [
                    new Slide(path.join('03-natural-sort', '1-first.md')),
                    new Slide(path.join('03-natural-sort', '9-second.md')),
                    new Slide(path.join('03-natural-sort', '12-last.md'))
                ]),
                new Slide('99-new.md')
            ]);
        });

        it('does not fail on no folder', async () => {
            expect(await new plugin('asdfasdfasdf').resolve()).to.deep.eq([]);
        });
    });

    describe('attached', () => {
        let server: Server;
        const cwd = path.join(__dirname, '..', 'test_data');

        afterEach(() => {
            return server.close();
        });

        it('serves slides to /slides', async () => {
            server = new Server([ new plugin(cwd) ]);
            await server.listen(0);

            await request(server.server)
                .get('/slides/00-intro.md')
                .expect((res: request.Response) => expect(res.text).to.match(/# title/m))
                .expect(200);
        });
    });
});