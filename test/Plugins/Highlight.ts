import * as path from 'path';
import plugin from '../../src/plugins/Highlight';
import { resolve } from '../../src/plugins/Highlight';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('highlight', () => {
    describe('dir', () => {
        it('matches the package location of highlight.js', () => {
            expect(new plugin('vs.css').dir).to.contain(path.join('kc-serve', 'node_modules', 'highlight.js', 'styles'));
        });
    });

    describe('resolve', () => {
        it('may include file extension', () => {
            expect(resolve('vs.css')).to.contain(path.join('kc-serve', 'node_modules', 'highlight.js', 'styles'));
        });

        it('may ommit file extension', () => {
            expect(resolve('vs')).to.contain(path.join('kc-serve', 'node_modules', 'highlight.js', 'styles'));
        });

        it('may be friendly name', () => {
            expect(resolve('vs 2015')).to.contain(path.join('kc-serve', 'node_modules', 'highlight.js', 'styles'));
        });

        it('ignores casing', () => {
            expect(resolve('VS 2015')).to.contain(path.join('kc-serve', 'node_modules', 'highlight.js', 'styles'));
        });

        it('throws when style not resolved', () => {
            try {
                resolve('some-non-existing-style');
                expect.fail();
            } catch (err) {
                expect(err.message).to.contain('\'some-non-existing-style.css\' not found');
            }
        });
    });

    describe('attach', () => {
        let server: Server;

        afterEach(() => {
            return server.close();
        });

        it('serves highlight files to /highlight', async () => {
            server = new Server([new plugin('vs.css')]);
            await server.listen(0);

            await request(server.server)
                .get('/css/highlight/vs.css')
                .expect(200)
                .expect((res: request.Response) => expect(res.text).to.match(/Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>/m));
        });
    });
});