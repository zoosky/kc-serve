#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');
var server = require('./server')
var print = require('./print')
var template = require('./template')
var resolver = require('./resolver')
var path = require('path')
var opn = require('opn')
var debug = require('debug')('kc:index')

program
    .version(require('../package.json').version)

program
  .command('serve [dir]')
  .description('serve presentation')
  .option('-p, --port <port>', 'serve presentation on specified port')
  .option('-o, --open', 'open presentation in a browser')
  .action((dir, options) => {
    debug('dir: ', dir)
    debug('options: ', options)
    var cwd = dir || path.join(process.cwd())
    var r = resolver(cwd);

    var data = { 
        title: path.basename(process.cwd()),
        slides: () => r.slides(),
        css: () => r.css(),
        server: {}
    };

    server(
      template(), 
      data, 
      {
        cwd: cwd, 
        port: 
        options.port || 3000 
      }, 
      url => open(options.open, url)
    );
  })

program
  .command('print [dir]')
  .description('print presentation')
  .action(dir => {
    var cwd = dir || process.cwd();
    var r = resolver(cwd);

    var data = { 
        title: path.basename(process.cwd()),
        slides: () => r.slides(),
        css: () => r.css(),
        server: {}
    };

    print(
        data,
        { 
          cwd: cwd, 
          port: 2999 
        }, 
        () => console.log('Done.')
      );
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

      server(
        template(),
        data,
        {
          cwd: cwd,
          port: 3001
        },
        url => open(true, url))
});

program.parse(process.argv);

function open(open, url) {
  console.log(`Presentation: ${url}`)
  if (open) {
    opn(url);
  } 
}