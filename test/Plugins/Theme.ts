import plugin from '../../src/plugins/Theme';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('Theme', () => {
    describe('dir', () => {
        it('matches theme folder location', () => {
            expect(new plugin('reveal.js/css/theme/beige.css').dir).to.contain('reveal.js');
        });
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