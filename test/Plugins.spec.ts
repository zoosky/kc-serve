import * as path from 'path';
import * as plugins from '../src/Plugins';
import { Slide, SlideFolder } from '../src/SlideObject';
import { expect } from 'chai';
import { Server } from '../src/Server';
import * as request from 'supertest';
import * as templates from '../src/template/all';

describe('Plugin', () => {
    describe('slides', () => {
        describe('resolve', () => {
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
 });

    describe('css resolve', () => {
        it('lists css-files in the /css directory', async () => {
            const dir = path.join(__dirname, 'test_data');
            expect(await new plugins.CustomCss(dir).resolve()).to.deep.eq(['demo.css']);
        });

        it('does not fail on no folder', async () => {
            expect(await new plugins.CustomCss('asdfasdfasdf').resolve()).to.deep.eq([]);
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
            let index = new templates.Index('kc - help', [], []);
            let template = new plugins.Template(index);

            server = new Server([ template ]);
            await server.listen(8396);

            await request(server.server)
                .get('/')
                .expect(200);
        });

        it ('includes new slides on new request', async () => {
            let slides: Slide[] = [];

            let index = new templates.Index('test', [], [ new templates.Slides({ resolve: () => Promise.resolve(slides) }, 'slides')]);
            let template = new plugins.Template(index);

            server = new Server([ template ]);
            await server.listen(8385);

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
            server = new Server([ reveal ]);
            await server.listen(8386);

            request(server.server)
                .get('/reveal/css/reveal.css')
                .expect((res: request.Response) => expect(res.text).to.match(/html, body, .reveal div/m))
                .expect(200);
        });

        it('serves highlight files to /highlight', async () => {
            let highlight = new plugins.Highlight();

            server = new Server([ highlight ]);
            await server.listen(8387);

            await request(server.server)
                .get('/css/highlight/vs.css')
                .expect((res: request.Response) => expect(res.text).to.match(/Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>/m))
                .expect(200);
        });

        it('serves theme files to /theme', async () => {
            let theme = new plugins.Theme();

            server = new Server([ theme ]);
            await server.listen(8388);

            await request(server.server)
                .get('/theme/infosupport.css')
                .expect((res: request.Response) => expect(res.text).to.match(/Info Support theme for reveal.js presentations/m))
                .expect(200);
        });

        it('serves slides to /slides', async () => {
            let slides = new plugins.Slides(cwd);

            server = new Server([ slides ]);
            await server.listen(8389);

            await request(server.server)
                .get('/slides/00-intro.md')
                .expect((res: request.Response) => expect(res.text).to.match(/# title/m))
                .expect(200);
        });

        it('serves img to /img', async () => {
            let img = new plugins.Img(cwd);

            server = new Server([ img ]);
            await server.listen(8390);

            await request(server.server)
                .get('/img/plaatje.jpg')
                .expect(200);
        });

        it('serves css files to /css', async () => {
            let css = new plugins.CustomCss(cwd);

            server = new Server([ css ]);
            await server.listen(8391);

            await request(server.server)
                .get('/css/demo.css')
                .expect(200);
        });

        it('404 everything else', async () => {
            server = new Server([]);
            await server.listen(8392);

            await request(server.server)
                .get('/foo/bar')
                .expect(404);
        });
    });
});