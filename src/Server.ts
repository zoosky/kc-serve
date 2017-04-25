import * as express from 'express';
import * as http from 'http';

export interface RequestHandler {
    attach(app: express.Express): void;
}
export class Server {

    public server: http.Server;
    private app: express.Express;

    constructor(plugins: RequestHandler[], private port: number) {
        this.app = express();

        plugins.forEach(_ => {
            _.attach(this.app);
        });
    }

    listen() {
        return new Promise<string>((resolve, reject) => {
            this.server = this.app.listen(this.port, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`http://localhost:${this.server.address().port}/`);
                }
            });
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
