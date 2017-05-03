import { expect } from 'chai';
import * as fs from 'mz/fs';
import { Printer } from '../src/Printer';
import * as plugins from '../src/Plugins';
import { Server } from '../src/Server';
import * as express from 'express';
import { Slide } from '../src/SlideObject';

describe('Printer', function () {

    this.timeout(20000);

    it('should output an pdf', async () => {
        let reveal = new plugins.Reveal();
        let highlight = new plugins.Highlight();
        let theme = new plugins.Theme();

        let slides = { 
            path: '/slides', 
            resolve: () => Promise.resolve([new Slide('title.md')]),
            attach: (app: express.Express) => app.get('/slides/*', (_: any, res: express.Response) => res.status(200).send('# TEST').end())
        };

        let template = new plugins.Template(
            'test',
            reveal,
            { path: '/css', resolve: () => Promise.resolve([])},
            highlight,
            slides,
            theme,
        );

        let server = new Server([template, reveal, highlight, theme, slides], 8383);

        let output = 'slides.pdf';
        if (await fs.exists(output)) {
            await fs.unlink(output);
        }

        await new Printer(server, reveal).print(output);
        await server.close();

        expect(await fs.exists(output)).to.be.true;
    });
});

