import * as express from 'express';
import * as path from 'path';
import { Resolver } from './Resolver';
import { Template } from './Template';
import { Options } from './Options';
import { TemplateData } from './TemplateData';
import * as http from 'http';

export class Server {

    public server: http.Server;
    private app: express.Express;

    constructor(data: TemplateData, private options: Options) {
        this.app = express();
        this.app.get('/', (_, res) => {
            res.status(200).send(new Template(data).compile());
        });

        this.app.use('/reveal', express.static(Resolver.reveal()));
        this.app.use('/css/highlight', express.static(path.join(Resolver.highlight(), 'styles')));

        var theme = path.join(__dirname, 'theme');
        this.app.use('/theme', express.static(theme));
        this.app.use('/img', express.static(path.join(options.cwd, 'img')));
        this.app.use('/css', express.static(path.join(options.cwd, 'css')));
        this.app.use('/slides', express.static(path.join(options.cwd, 'slides')));
    }

    listen() {
        return new Promise<string>((resolve, reject) => {
            this.server = this.app.listen(this.options.port, (err: any) => {
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
};
