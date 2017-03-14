#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');
const spawn = require('cross-spawn');

program
  .version('0.0.2')

program
  .command('init')
  .description('Alias for "yo reveal-infosupport"')
  .action(function(cmd, options) { 
    spawn('yo', ['reveal-infosupport'], { stdio: 'inherit', });
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ kc init');
  });

program
  .command('serve')
  .description('Alias for "grunt serve"')
  .action(function(cmd, options) {
    spawn('grunt', ['serve'], { stdio: 'inherit'});
  });

program
  .command('print')
  .description('Print slide deck to PDF')
  .command('init',  'Alias for "yo reveal-infosupport"')
  .action(function(cmd, options) {
    spawn('phantomjs', ['bower_components/reveal.js/plugin/print-pdf/print-pdf.js', 'http://localhost:9000/?print-pdf', 'slides.pdf'], { stdio: 'inherit'});
  });

program
  .command('dist')
  .description('Alias for "grunt dist"')
  .action(function(cmd, options) {
    spawn('grunt', ['dist'], { stdio: 'inherit'});
  });

program
  .command('install')
  .description('Install package dependencies after a fresh clone')
  .action(function(cmd, options) {
    spawn('npm', ['install'], { stdio: 'inherit'});
    spawn('bower', ['install'], { stdio: 'inherit'});
  });  

program.parse(process.argv);

if (!program.args.length) program.help();