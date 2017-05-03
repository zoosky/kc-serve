import * as path from 'path';
import * as plugins from '../src/Plugins';
import { Slide, SlideFolder } from '../src/SlideObject';
import { expect } from 'chai';
import { Server } from '../src/Server';
import * as request from 'supertest';

describe('Plugin', () => {
    describe('slides resolve', () => {
        it('iterates folders and files', async () => {
            const slides = await new plugins.Slides(path.join(__dirname, 'test_data')).resolve();
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
            expect(await new plugins.Slides('asdfasdfasdf').resolve()).to.deep.eq([]);
        });
    });

    describe('css resolve', () => {
        it('lists css-files in the /css directory', async () => {
            const dir = path.join(__dirname, 'test_data');
            expect(await new plugins.Css(dir).resolve()).to.deep.eq(['demo.css']);
        });

        it('does not fail on no folder', async () => {
            expect(await new plugins.Css('asdfasdfasdf').resolve()).to.deep.eq([]);
        });
    });

    describe('reveal', () => {
        it('root matches the package location of reveal.js', () => {
            expect(new plugins.Reveal().root).to.contain(path.join('kc-cli', 'node_modules', 'reveal.js'));
        });
    });

    describe('highlight', () => {
        it('root matches the package location of highlight.js', () => {
            expect(new plugins.Highlight().root).to.contain(path.join('kc-cli', 'node_modules', 'highlight.js', 'styles'));
        });
    });

    describe('theme', () => {
        it ('root matches theme folder location', () => {
            expect(new plugins.Theme().root).to.contain(path.join('src', 'theme'));
        });
    });

    describe('attached as request handler to server', () => {
        let server: Server;
        const cwd = path.join(__dirname, 'test_data');

        afterEach(() => {
            return server.close();
        });

        it('serves template to /', async () => {
            let template = new plugins.Template(
                'test',
                { path: 'reveal'},
                { path: 'css', resolve: () => Promise.resolve([])},
                { path: 'highlight'},
                { path: 'slides', resolve: () => Promise.resolve([])},
                { path: 'theme'},
            );

            server = new Server([ template ], 8396);
            await server.listen();

            await request(server.server)
                .get('/')
                .expect(200);
        });

        it ('includes new slides on new request', async () => {
            let slides: Slide[] = [];
            let template = new plugins.Template(
                'test',
                { path: 'reveal'},
                { path: 'css', resolve: () => Promise.resolve([])},
                { path: 'highlight'},
                { path: 'slides', resolve: () => Promise.resolve(slides)},
                { path: 'theme'},
            );

            server = new Server([ template ], 8385);
            await server.listen();

            await request(server.server)
                .get('/')
                .expect((res: request.Response) => expect(res.text).to.not.match(/99-new.md/m));
            
            slides.push(new Slide('99-new.md'));
            await request(server.server)
                .get('/')
                .expect((res: request.Response) => expect(res.text).to.match(/99-new.md/m));
        });

        it('serves reveal files to /reveal', async() => {
            let reveal = new plugins.Reveal();
            server = new Server([ reveal ], 8386);
            await server.listen();

            request(server.server)
                .get('/reveal/css/reveal.css')
                .expect((res: request.Response) => expect(res.text).to.match(/html, body, .reveal div/m))
                .expect(200);
        });

        it('serves highlight files to /highlight', async () => {
            let highlight = new plugins.Highlight();

            server = new Server([ highlight ], 8387);
            await server.listen();

            await request(server.server)
                .get('/css/highlight/vs.css')
                .expect((res: request.Response) => expect(res.text).to.match(/Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>/m))
                .expect(200);
        });

        it('serves theme files to /theme', async () => {
            let theme = new plugins.Theme();

            server = new Server([ theme ], 8388);
            await server.listen();

            await request(server.server)
                .get('/theme/infosupport.css')
                .expect((res: request.Response) => expect(res.text).to.match(/Info Support theme for reveal.js presentations/m))
                .expect(200);
        });

        it('serves slides to /slides', async () => {
            let slides = new plugins.Slides(cwd);

            server = new Server([ slides ], 8389);
            await server.listen();

            await request(server.server)
                .get('/slides/00-intro.md')
                .expect((res: request.Response) => expect(res.text).to.match(/# title/m))
                .expect(200);
        });

        it('serves img to /img', async () => {
            let img = new plugins.Img(cwd);

            server = new Server([ img ], 8390);
            await server.listen();

            await request(server.server)
                .get('/img/plaatje.jpg')
                .expect(200);
        });

        it('serves css files to /css', async () => {
            let css = new plugins.Css(cwd);

            server = new Server([ css ], 8391);
            await server.listen();

            await request(server.server)
                .get('/css/demo.css')
                .expect(200);
        });

        it('404 everything else', async () => {
            server = new Server([], 8392);
            await server.listen();

            await request(server.server)
                .get('/foo/bar')
                .expect(404);
        });
    });
});