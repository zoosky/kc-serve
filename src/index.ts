import * as opn from 'opn';
import * as path from 'path';
import * as program from 'commander';
import Server from './Server';
import Printer from './Printer';
import * as chalk from 'chalk';

const debug = require('debug')('kc:index');
const error = chalk.bold.red;

program
  .version(require('../package.json').version);

interface ServeOptions {
  port: number | boolean;
  open: boolean;
}

program
  .command('serve [dir]')
  .description('serve presentation')
  .option('-p, --port [port]', 'serve presentation on random or specified port')
  .option('-o, --open', 'open presentation in the default browser')
  .action(async (dir: string, options: ServeOptions) => {
    debug('dir: ', dir);
    debug('options: ', options);
    dir = dir || process.cwd();
    let port = options.port === true ? 0 : options.port || 3000;

    try {
      const url = await Server.create(dir, path.basename(dir)).listen(port);
      open(options.open, url);
    }
    catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.log('Port %s  is already in use. Probably another presentation running?.', chalk.bold(port.toString()));
        console.log('  Hint: grab a random port with %s or choose one with %s.', chalk.bold('-p'), chalk.bold('-p [port]'));
        console.log('  Hint: combine it to %s to open the presentation in the browser.', chalk.bold('-op'));
      } else {
        console.error(error(err.message));
      }
    }
  });

interface PrintOptions {
  open: boolean;
}

program
  .command('print [file] [dir]')
  .description('print presentation to pdf')
  .option('-o, --open', 'open pdf after printing')
  .action(async (file: string, dir: string, options: PrintOptions) => {
    dir = dir || process.cwd();
    file = file || 'slides.pdf';

    try {
      let server = Server.create(dir, 'print');
      let url = await server.listen(0);

      await new Printer().print(url, file);
      server.close();

      if (options.open) {
        opn(file, { wait: false });
      }
    } catch (err) {
      console.error(error(err.message));
    }
  });

program
  .command('help')
  .description('view presentation on how to create slick presentations')
  .action(async () => {
    const cwd = path.join(__dirname, 'help');
    const port = 3001;

    try {
      const url = await Server.create(cwd, 'kc - help').listen(port);
      open(true, url);
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.log('Port %s in use, probably another %s instance already running.', chalk.bold(port.toString()), chalk.bold('kc help'));
      } else {
        console.error(error(err.message));
      }
    }
  });

program.parse(process.argv);

function open(open: boolean, url: string) {
  console.log('Presentation url: %s', chalk.bold(url));
  if (open) {
    opn(url);
  } else {
    console.log('  Hint: open the url in your default browser with %s!', chalk.bold('kc serve -o'));
  }

  console.log('Press %s to stop the process.', chalk.bold('\CTRL+C'));
}