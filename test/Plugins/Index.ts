import plugin from '../../src/plugins/Template';
import template from '../../src/template/Index';
import { expect } from 'chai';
import Server from '../../src/Server';
import * as request from 'supertest';

describe('Plugin', () => {    
    describe('attach', () => {
        let server: Server;
        
        afterEach(() => {
            return server.close();
        });

        it('serves template to /', async () => {
            server = new Server([ new plugin(new template('kc - help', [])) ]);
            await server.listen(0);

            await request(server.server)
                .get('/')
                .expect(200);
        });

        it ('not cache body parts', async () => {

            let msg = 'first try';
            let index = new template('test', [{ body: () => Promise.resolve(msg) }]);

            server = new Server([  new plugin(index) ]);
            await server.listen(8385);

            await request(server.server)
                .get('/')
                .expect((res: request.Response) => expect(res.text).to.match(/first try/m));

            msg = 'after update';
            await request(server.server)
                .get('/')
                .expect((res: request.Response) => expect(res.text).to.match(/after update/m))
                .expect((res: request.Response) => expect(res.text).not.to.match(/first try/m));
        });
    });
});