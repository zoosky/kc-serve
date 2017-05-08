import * as express from 'express';
import * as http from 'http';

export interface ServerPlugin {
    attach(app: express.Express): void;
}
export class Server {

    public server: http.Server;
    private app: express.Express;

    constructor(plugins: ServerPlugin[], private port: number) {
        this.app = express();

        plugins.forEach(_ => _.attach(this.app));
    }

    listen() {
        return new Promise<string>((resolve, reject) => {
            this.server = http.createServer(this.app);
            this.server.on('error', e => reject(e));

            this.server.listen(this.port, () =>
                resolve(`http://localhost:${this.server.address().port}/`));
        });
    }

    close() {
        return new Promise<void>((resolve, reject) => {
            this.server.close((error: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
