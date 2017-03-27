#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');
const spawn = require('cross-spawn');
var server = require('./server')
var template = require('./template')
var resolver = require('./resolver')
var path = require('path')
var opn = require('opn')

program
    .version('2.0.0')

program
  .command('serve')
  .description('serve presentation')
  .option('-p, --port <port>', 'serve presentation on specified port')
  .option('-d, --dir <directory>', 'serve from presentation directory')
  .option('-o, --open', 'open presentation in a browser')
  .action((cmd, options) => {
    var cwd = cmd.dir || path.join(process.cwd())
    var r = resolver(cwd);

    var data = { 
        title: path.basename(process.cwd()),
        slides: () => r.slides(),
        css: () => r.css(),
        server: {}
    };

    server(template(), data, { cwd: cwd, port: cmd.port || 3000 }, url => open(cmd.open, url));
  })

program
  .command('help')
  .description('view presentation on how to create slick presentations')
  .action((cmd, options) => { 
      var cwd = path.join(__dirname, 'help');
      var data = { 
        title: 'kc - help',
        slides: resolver(cwd).slides(),
        server: {}
      };

      server(template(), data, { cwd: cwd, port: 3001, open: true }, url => open(true, url))
});

program.parse(process.argv);

function open(open, url) {
  console.log(`Presentation: ${url}`)
  if (open) {
    opn(url);
  } 
}