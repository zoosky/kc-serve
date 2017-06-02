import * as express from 'express';
import * as http from 'http';

import * as plugins from './plugins/all';
import * as templates from './template/all';

export interface ServerPlugin {
    attach(app: express.Express): void;
}
export default class Server {

    public server: http.Server;
    private app: express.Express;

    constructor(plugins: ServerPlugin[]) {
        this.app = express();

        plugins.forEach(_ => _.attach(this.app));
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

    static create(cwd: string, title: string): Server {
        let reveal = new plugins.Reveal();
        let css = new plugins.CustomCss(cwd);
        let highlight = new plugins.Highlight();
        let slides = new plugins.Slides(cwd);
        let theme = new plugins.Theme();
        let img = new plugins.Img(cwd);

        let index = new templates.Index(title, 
        [
            new templates.Reveal.Css(reveal.path),
            new templates.Theme(theme.path),
            new templates.CustomCss(css, css.path),
            new templates.Reveal.PdfScript(reveal.path)
        ], 
        [ 
            new templates.Slides(slides, slides.path),
            new templates.Reveal.MainScript(reveal.path)
        ]);
        let template = new plugins.Template(index);
        
        return new Server([reveal, css, highlight, slides, theme, template, img]);
    }
}
