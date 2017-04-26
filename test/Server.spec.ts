import { Server } from '../src/Server';
import { expect } from 'chai';


describe('Server', () => {
    describe('initializing server', () => {
        it('should resolve the promise ', async () => {
            const server = new Server([],
                8885);
            const address = await server.listen();
            expect(address).to.be.eq('http://localhost:8885/');
            return server.close();
        });

        it('open same port twice', async () => {
            const server1 = new Server([], 8889);
            const server2 = new Server([], 8889);
            
            await server1.listen();
            try {
                await server2.listen();
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
            const server = new Server([], 8885);
            await server.listen();
            
            await server.close();
            expect(server.server.listening).to.be.false;
        });
    });
});