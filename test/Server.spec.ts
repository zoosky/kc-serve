import Server from '../src/Server';
import { expect } from 'chai';

describe('Server', () => {
    describe('initializing server', () => {
        it('should resolve the promise ', async () => {
            const server = new Server([]);
            const address = await server.listen(8885);
            expect(address).to.be.eq('http://localhost:8885/');
            return server.close();
        });

        it('open same port twice', async () => {
            const server1 = new Server([]);
            const server2 = new Server([]);

            await server1.listen(8889);
            try {
                await server2.listen(8889);
                expect.fail();
            }
            catch (err) {
                expect(err.toString()).to.eq('Error: listen EADDRINUSE :::8889');
            }
            finally {
                await server1.close();
            }
        });
    });

    describe('close', () => {
        it('stops listening', async () => {
            const server = new Server([]);
            await server.listen(8885);

            await server.close();
            expect(server.server.listening).to.be.false;
        });
    });
});