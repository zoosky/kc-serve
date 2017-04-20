import * as express from 'express';
import { Resolver } from './Resolver';
import { Template } from './Template';
import * as http from 'http';

export class Server {

    public server: http.Server;
    private app: express.Express;

    constructor(template: Template, resolver: Resolver, private port: number) {
        this.app = express();
        this.app.get('/', async (_, res) => {
            res.status(200).send(template.compile(await resolver.slides(), await resolver.css()));
        });

        this.app.use(this.root(template.dirs.reveal), express.static(resolver.reveal()));
        this.app.use(this.root(template.dirs.highlight), express.static(resolver.highlightCss()));
        this.app.use(this.root(template.dirs.theme), express.static(resolver.theme()));

        this.app.use(this.root('img'), express.static(resolver.dirs.img()));
        this.app.use(this.root(template.dirs.css), express.static(resolver.dirs.css()));
        this.app.use(this.root(template.dirs.slides), express.static(resolver.dirs.slides()));
    }

    private root(folder: string): string {
        return `/${folder}`;
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
