var server = require('./server')
var template = require('./template')
var resolver = require('./resolver')
var spawn = require('cross-spawn')
var path = require('path')


module.exports = (data, options, cb) => {
     data.sever = {
        port: 3002
    }

    var s = server(template(), data, options, url => {
        var plugin = path.join(resolver.reveal(), 'plugin', 'print-pdf', 'print-pdf.js')
        
        var cp = spawn('phantomjs', [plugin, `${url}?print-pdf`, 'slides.pdf']);
        cp.stdout.on('data', (data) => {
            if (data.toString().match(/Export PDF: Finished successfully!/g)) {
                s.close();
                cb();
            }
        });
    });
}