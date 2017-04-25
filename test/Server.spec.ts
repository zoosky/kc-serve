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