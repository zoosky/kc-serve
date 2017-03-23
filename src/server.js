var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

module.exports = (template, data, cwd) => {
    app.get('/', (req, res) => {
        res.status(200).send(template(data));
    });

    var reveal = path.resolve(require.resolve('reveal.js'), '..', '..');
    app.use('/reveal', express.static(reveal));

    var highlight = path.resolve(require.resolve('highlight.js'), '..', '..', 'styles');
    app.use('/css/highlight', express.static(highlight));

    var theme = path.join(__dirname, 'theme');
    app.use('/theme', express.static(theme));

    app.use('/img', express.static(path.join(cwd, 'img')));
    
    data.server.slides = '/slides'
    app.use('/slides', express.static(path.join(cwd, 'slides')));

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Example app listening at port %s', port);
    });

    return server;
};
