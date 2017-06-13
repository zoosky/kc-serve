import * as express from 'express';
import * as http from 'http';

export interface ServerPlugin {
    path: string;
    handler  (): express.Handler;
}
export default class Server {

    public server: http.Server;
    private app: express.Express;

    constructor(plugins: ServerPlugin[]) {
        this.app = express();

        plugins.forEach(_ => this.app.use(_.path, _.handler()));
    }

    listen(port: number) {
        return new Promise<string>((resolve, reject) => {
            this.server = http.createServer(this.app);
            this.server.on('error', e => reject(e));

            this.server.listen(port, () =>
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
