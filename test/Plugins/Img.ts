import * as path from 'path';
import plugin from '../../src/plugins/Img';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('Plugin', () => {    
    describe('attach', () => {
        let server: Server;
        const cwd = path.join(__dirname, '..', 'test_data');

        afterEach(() => {
            return server.close();
        });

        it('serves img to /img', async () => {
            server = new Server([ new plugin(cwd) ]);
            await server.listen(0);

            await request(server.server)
                .get('/img/plaatje.jpg')
                .expect(200);
        });
    });
});