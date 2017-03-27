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

program
    .version('2.0.0')

program
  .command('serve')
  .description('serve presentation from slides directory')
  .option('-p, --port <port>', 'host presentation on port')
  .option('-d, --dir <directory>', 'presentation directory')
  .action((cmd, options) => {
    var cwd = cmd.dir || path.join(process.cwd())
    var r = resolver(cwd);

    var data = { 
        title: path.basename(process.cwd()),
        slides: r.slides(),
        css: r.css(),
        server: {}
    };

    server(template(), data, { cwd: cwd, port: cmd.port || 3000 });
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

      server(template(), data, { cwd: cwd, port: 3001 })
});

program.parse(process.argv);