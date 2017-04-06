import * as opn from 'opn';
import * as path from 'path';
import * as program from 'commander';
import { Server } from './Server';
import { Printer } from './Printer';
import { Resolver } from './Resolver';
import { TemplateData } from './TemplateData';
import * as debugFn from 'debug';

const debug = debugFn('kc:index');

interface CliOptions {
  port: number;
  open: boolean;
}

program
  .version(require('../package.json').version);


program
  .command('serve [dir]')
  .description('serve presentation')
  .option('-p, --port <port>', 'serve presentation on specified port')
  .option('-o, --open', 'open presentation in a browser')
  .action(async (dir: string, options: CliOptions) => {
    debug('dir: ', dir);
    debug('options: ', options);
    const cwd = dir || path.join(process.cwd());
    const resolver = new Resolver(cwd);

    const data: TemplateData = {
      title: path.basename(process.cwd()),
      slides: await resolver.slides(),
      css: resolver.css()
    };

    const url = await new Server(
      data,
      {
        cwd: cwd,
        port: options.port || 3000
      },
    ).listen();
    open(options.open, url);
  });

program
  .command('print [dir]')
  .description('print presentation')
  .action(async (dir: string) => {
    const cwd = dir || process.cwd();
    const r = new Resolver(cwd);

    const data: TemplateData = {
      title: path.basename(process.cwd()),
      slides: await r.slides(),
      css: r.css()
    };

    await new Printer(
      data, {
        cwd: cwd,
        port: 2999
      }
    ).print();
    console.log('Done.');
  });

program
  .command('help')
  .description('view presentation on how to create slick presentations')
  .action(async () => {
    const cwd = path.join(__dirname, 'help');
    const data: TemplateData = {
      title: 'kc - help',
      slides: await new Resolver(cwd).slides(),
      css: []
    };

    const url = await new Server(
      data,
      {
        cwd: cwd,
        port: 3001
      }).listen();
    open(true, url);
  });

program.parse(process.argv);

function open(open: boolean, url: string) {
  console.log(`Presentation: ${url}`);
  if (open) {
    opn(url);
  }
}