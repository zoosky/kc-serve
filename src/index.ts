import * as debugFn from 'debug';
import * as opn from 'opn';
import * as path from 'path';
import * as program from 'commander';
import { Server } from './Server';
import { Printer } from './Printer';
import { Resolver } from './Resolver';
import { TemplateData } from './TemplateData';

const debug = debugFn('kc:index');

program
  .version(require('../package.json').version)


program
  .command('serve [dir]')
  .description('serve presentation')
  .option('-p, --port <port>', 'serve presentation on specified port')
  .option('-o, --open', 'open presentation in a browser')
  .action(async (dir, options) => {
    debug('dir: ', dir)
    debug('options: ', options)
    var cwd = dir || path.join(process.cwd())
    var r = new Resolver(cwd);

    var data: TemplateData = {
      title: path.basename(process.cwd()),
      slides: await r.slides(),
      css: r.css(),
      server: {}
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
  .action(async dir => {
    var cwd = dir || process.cwd();
    var r = new Resolver(cwd);

    var data: TemplateData = {
      title: path.basename(process.cwd()),
      slides: await r.slides(),
      css: r.css(),
      server: {}
    };

    await new Printer(
      data, {
        cwd: cwd,
        port: 2999
      }
    ).print();
    console.log('Done.')
  });

program
  .command('help')
  .description('view presentation on how to create slick presentations')
  .action(async (cmd, options) => {
    var cwd = path.join(__dirname, 'help');
    var data: TemplateData = {
      title: 'kc - help',
      slides: await new Resolver(cwd).slides(),
      server: {},
      css: []
    };

    const url = await new Server(
      data,
      {
        cwd: cwd,
        port: 3001
      }).listen();
    open(true, url)
  });

program.parse(process.argv);

function open(open, url) {
  console.log(`Presentation: ${url}`)
  if (open) {
    opn(url);
  }
}