#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');
const spawn = require('cross-spawn');

program
  .version('0.0.11')

program
  .command('')
  .description('serve presentation slides directory')
  .action(function(cmd, options) {
    spawn('gulp', ['serve'], { stdio: 'inherit'});
  }).on('--help', function () {
  });

program.parse(process.argv);

if (!program.args.length) program.help();