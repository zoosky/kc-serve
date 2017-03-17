#!/usr/bin/env node

/**
 * Module dependencies.
 */
var program = require('commander');
const spawn = require('cross-spawn');

program
  .version('0.0.4')

spawn('npm', ['ls', '-g'])

program
  .command('init')
  .description('Alias for "yo @infosupport/kc"')
  .action(function(cmd, options) { 
    spawn('yo', ['@infosupport/kc'], { stdio: 'inherit', });
  })
  .on('--help', function() {
    console.log('  Create new or refresh existing presentation');
  });

program
  .command('serve')
  .description('Alias for "gulp serve"')
  .action(function(cmd, options) {
    spawn('gulp', ['serve'], { stdio: 'inherit'});
  });

program
  .command('print')
  .description('Print slide deck to PDF')
  .action(function(cmd, options) {
    var html = 'file:///' + process.cwd() + '/index.html?print-pdf';
    console.log(html);
    spawn('phantomjs', ['bower_components/reveal.js/plugin/print-pdf/print-pdf.js', html, 'slides.pdf'], { stdio: 'inherit'});
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