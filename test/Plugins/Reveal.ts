import * as path from 'path';
import plugin from '../../src/plugins/Reveal';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('Reveal', () => {
    it('root matches the package location of reveal.js', () => {
        expect(new plugin().root).to.contain(path.join('kc-cli', 'node_modules', 'reveal.js'));
    });

    describe('attach', () => {
        let server: Server;

        afterEach(() => {
            return server.close();
        });

        it('serves reveal files to /reveal', async() => {
            server = new Server([  new plugin() ]);
            await server.listen(0);

            request(server.server)
                .get('/reveal/css/reveal.css')
                .expect((res: request.Response) => expect(res.text).to.match(/html, body, .reveal div/m))
                .expect(200);
        });
    });
});