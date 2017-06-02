import * as path from 'path';
import plugin from '../../src/plugins/Theme';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('Theme', () => {
    it('root matches theme folder location', () => {
        expect(new plugin().root).to.contain(path.join('src', 'theme'));
    });

    describe('attach', () => {
        let server: Server;

        afterEach(() => {
            return server.close();
        });

        it('serves theme files to /theme', async () => {
            server = new Server([ new plugin() ]);
            await server.listen(0);

            await request(server.server)
                .get('/theme/infosupport.css')
                .expect((res: request.Response) => expect(res.text).to.match(/Info Support theme for reveal.js presentations/m))
                .expect(200);
        });
    });
});