import * as opn from 'opn';
import * as path from 'path';
import * as program from 'commander';
import { Server } from './Server';
import { Printer } from './Printer';
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
  .option('-o, --open', 'open presentation in the browser')
  .action(async (dir: string, options: CliOptions) => {
    debug('dir: ', dir);
    debug('options: ', options);
    const cwd = dir || path.join(process.cwd());
    const url = await Server.create(cwd, '').listen(options.port || 3000);
    open(options.open, url);
  });

program
  .command('print [file] [dir]')
  .description('print presentation')
  .action(async (file: string, dir: string) => {
    const cwd = dir || process.cwd();
    let server = Server.create(cwd, 'print');
    let url = await server.listen(2999);

    await new Printer().print(url, file || 'slides.pdf');
    server.close();

    console.log('Done.');
  });

program
  .command('help')
  .description('view presentation on how to create slick presentations')
  .action(async () => {
    const cwd = path.join(__dirname, 'help');
    const url = await Server.create(cwd, 'kc - help').listen(3001);
    open(true, url);
  });

program.parse(process.argv);

function open(open: boolean, url: string) {
  console.log(`Presentation url: ${url}`);
  if (open) {
    opn(url);
  } else {
    // Thanks to: https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
    console.log('  Hint: open the url in your default browser with \x1b[1mkc serve -o\x1b[0m!');
  }

  console.log('Press \'\CTRL+C\' to stop the process.');
}