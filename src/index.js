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
  .action(function(cmd, options) {
    var cwd = path.join(process.cwd())
    var data = { 
        title: path.basename(process.cwd()),
        slides: resolver.slides(cwd),
        css: resolver.css(cwd),
        server: {}
    };

    server(template(), data, cwd);
  });

program
  .command('help')
  .description('view presentation about this tool')
  .action((cmd, options) => { 
      var cwd = path.join(__dirname, 'help');
      var data = { 
        title: 'kc - help',
        slides: resolver.slides(cwd),
        server: {}
      };

      server(template(), data, cwd)
});

program.parse(process.argv);

if (!program.args.length) program.help();