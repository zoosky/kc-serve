import * as path from 'path';
import plugin from '../../src/plugins/CustomCss';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('CustomCss', () => {
    describe('resolve', () => {
        it('lists css-files in the /css directory', async () => {
            const dir = path.join(__dirname, '..', 'test_data');
            expect(await new plugin(dir).resolve()).to.deep.eq(['demo.css']);
        });

        it('does not fail on no folder', async () => {
            expect(await new plugin('asdfasdfasdf').resolve()).to.deep.eq([]);
        });
    });

    describe('attach', () => {
        let server: Server;
        const cwd = path.join(__dirname, '..', 'test_data');

        afterEach(() => {
            return server.close();
        });

        it('serves css files to /css', async () => {
            server = new Server([ new plugin(cwd) ]);
            await server.listen(0);

            await request(server.server)
                .get('/css/demo.css')
                .expect(200);
        });
    });
});