#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')

program
  .command('init')
  .description('Alias for "yo reveal-infosupport"')
  .action(function(cmd, options) { 
    console.log('yo reveal-infosupport'); 
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
     console.log('yo grunt serve'); 
  });

program
  .command('print')
  .description('Print slide deck to PDF')
  .command('init',  'Alias for "yo reveal-infosupport"')
  .action(function(cmd, options) {
    console.log('phantomjs plugin/print-pdf/print-pdf.js "http://localhost:9000/?print-pdf" slides.pdf'); 
  });

program
  .command('dist')
  .description('Alias for "grunt dist"')
  .action(function(cmd, options) {
    console.log('grunt dist'); 
  });

program.parse(process.argv);

