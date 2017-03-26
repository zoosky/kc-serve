var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var resolver = require('./resolver')

module.exports = (template, data, cwd) => {
    app.get('/', (req, res) => {
        res.status(200).send(template(data));
    });

    app.use('/reveal', express.static(resolver.reveal()));
    app.use('/css/highlight', express.static(path.join(resolver.highlight(), 'styles')));

    var theme = path.join(__dirname, 'theme');
    app.use('/theme', express.static(theme));

    app.use('/img', express.static(path.join(cwd, 'img')));
    app.use('/css', express.static(path.join(cwd, 'css')));
    
    data.server.slides = '/slides'
    app.use('/slides', express.static(path.join(cwd, 'slides')));

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Example app listening at port %s', port);
    });

    return server;
};
