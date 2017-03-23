var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

module.exports = (template, slides) => {
    app.get('/', (req, res) => {
        res.status(200).send(template());
    });

    var reveal = path.resolve(require.resolve('reveal.js'), '..', '..');
    app.use('/reveal', express.static(reveal));

    var highlight = path.resolve(require.resolve('highlight.js'), '..', '..', 'styles');
    app.use('/css/highlight', express.static(highlight));

    var theme = path.join(__filename, '..', 'theme');
    app.use('/theme', express.static(theme));

    app.use('/slides', express.static(slides));

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Example app listening at port %s', port);
    });

    return server;
};
