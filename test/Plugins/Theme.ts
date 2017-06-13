import plugin from '../../src/plugins/Theme';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('Theme', () => {
    describe('dir', () => {
        it('matches theme folder location', () => {
            expect(new plugin('reveal.js/css/theme/beige.css').dir).to.contain('reveal.js');
        });

        it('throws when style not resolved', () => {
            try {
                new plugin('some-non-existing-style');
                expect.fail();
            } catch (err) {
                expect(err.message).to.contain('\'some-non-existing-style\' not found');
            }
        });
    });

    it('resolves to reveal if package not found', () => {
        expect(new plugin('beige.css').dir).to.contain('reveal.js');
    });

    it('does not require filename extension for reveal themes', () => {
        expect(new plugin('beige').dir).to.contain('reveal.js');
    });

    describe('attach', () => {
        let server: Server;

        afterEach(() => {
            return server.close();
        });

        it('serves theme files to /theme', async () => {
            server = new Server([new plugin('reveal.js/css/theme/beige.css')]);
            await server.listen(0);

            await request(server.server)
                .get('/theme/beige.css')
                .expect(200)
                .expect((res: request.Response) => expect(res.text).to.match(/Beige theme for reveal.js./m));
        });
    });
});