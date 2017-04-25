import * as opn from 'opn';
import * as path from 'path';
import * as program from 'commander';
import { Server } from './Server';
import { Printer } from './Printer';
import * as plugins from './Plugins';
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
    let reveal = new plugins.Reveal();
    let css = new plugins.Css(cwd);
    let highlight = new plugins.Highlight();
    let slides = new plugins.Slides(cwd);
    let theme = new plugins.Theme();

    let template = new plugins.Template('kc - help',
        reveal,
        css,
        highlight,
        slides,
        theme
    );

    const url = await new Server(
      [reveal, css, highlight, slides, theme, template],
      options.port || 3000
    ).listen();
    open(options.open, url);
  });

program
  .command('print [file] [dir]')
  .description('print presentation')
  .action(async (file: string, dir: string) => {
    const cwd = dir || process.cwd();
    let reveal = new plugins.Reveal();
    let css = new plugins.Css(cwd);
    let highlight = new plugins.Highlight();
    let slides = new plugins.Slides(cwd);
    let theme = new plugins.Theme();

    let template = new plugins.Template('kc - help',
        reveal,
        css,
        highlight,
        slides,
        theme
    );

    let server = new Server(
      [reveal, css, highlight, slides, theme, template], 
      2999
    );

    await new Printer(server, reveal).print(file || 'slides.pdf');
    console.log('Done.');
  });

program
  .command('help')
  .description('view presentation on how to create slick presentations')
  .action(async () => {
    const cwd = path.join(__dirname, 'help');
    let reveal = new plugins.Reveal();
    let css = new plugins.Css(cwd);
    let highlight = new plugins.Highlight();
    let slides = new plugins.Slides(cwd);
    let theme = new plugins.Theme();
    let img = new plugins.Img(cwd);

    let template = new plugins.Template('kc - help',
        reveal,
        css,
        highlight,
        slides,
        theme
    );
    
    const url = await new Server(
      [reveal, css, highlight, slides, theme, template, img],
      3001).listen();
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