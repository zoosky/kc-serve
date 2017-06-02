import Server from '../../src/Server';
import * as request from 'supertest';

describe('no plugin attached', () => {
    let server: Server;

    afterEach(() => {
        return server.close();
    });

    describe('attach', () => {
        it('404 everything else', async () => {
            server = new Server([]);
            await server.listen(0);

            await request(server.server)
                .get('/foo/bar')
                .expect(404);
        });
    });
});