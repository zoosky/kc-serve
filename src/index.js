#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');
const spawn = require('cross-spawn');

program
  .version('0.0.11')

program
  .command('init')
  .description('Alias for "yo @infosupport/kc"')
  .action(function(cmd, options) { 
    spawn('yo', ['@infosupport/kc'], { stdio: 'inherit', });
  })
  .on('--help', function() {
    console.log('  (re)scaffold a presentation');
  });

program
  .command('serve')
  .description('Alias for "gulp serve"')
  .action(function(cmd, options) {
    spawn('gulp', ['serve'], { stdio: 'inherit'});
  }).on('--help', function () {
    console.log('  serve presentation on localhost with live reload')
  });

program
  .command('print')
  .description('Print slide deck to PDF')
  .action(function(cmd, options) {
    spawn('gulp', ['print'], { stdio: 'inherit'});
  }).on('--help', function () {
    console.log('  print slide deck to PDF using phantomjs')
  });
  
program
  .command('install')
  .description('Alias for npm install && bower install')
  .action(function(cmd, options) {
    spawn('npm', ['install'], { stdio: 'inherit'});
    spawn('bower', ['install'], { stdio: 'inherit'});
  }).on('--help', function () {
    console.log('  install local dependencies from package.json and bower.json')
  });  

program.parse(process.argv);

if (!program.args.length) program.help();