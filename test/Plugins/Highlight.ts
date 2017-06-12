import * as path from 'path';
import plugin from '../../src/plugins/Highlight';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('highlight', () => {
        it('root matches the package location of highlight.js', () => {
            expect(new plugin().root).to.contain(path.join('kc-serve', 'node_modules', 'highlight.js', 'styles'));
        });


    describe('attach', () => {
        let server: Server;

        afterEach(() => {
            return server.close();
        });

        it('serves highlight files to /highlight', async () => {
            server = new Server([ new plugin() ]);
            await server.listen(0);

            await request(server.server)
                .get('/css/highlight/vs.css')
                .expect((res: request.Response) => expect(res.text).to.match(/Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>/m))
                .expect(200);
        });
    });
});