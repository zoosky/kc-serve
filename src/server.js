var express = require('express');
var app = express();
var path = require('path');
var resolver = require('./resolver')

module.exports = (template, data, options, cb) => {
    app.get('/', (req, res) => {
        res.status(200).send(template(data));
    });

    app.use('/reveal', express.static(resolver.reveal()));
    app.use('/css/highlight', express.static(path.join(resolver.highlight(), 'styles')));

    var theme = path.join(__dirname, 'theme');
    app.use('/theme', express.static(theme));

    app.use('/img', express.static(path.join(options.cwd, 'img')));
    app.use('/css', express.static(path.join(options.cwd, 'css')));
    
    data.server.slides = '/slides'
    app.use('/slides', express.static(path.join(options.cwd, 'slides')));

    var server = app.listen(options.port, function () {
        if (cb) {
            cb(`http://localhost:${server.address().port}/`);
        }
    });

    return server;
};
