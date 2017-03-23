var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

module.exports = template => {
    app.get('/', (req, res) => {
        res.status(200).send(template);
    });

    var reveal = path.resolve(require.resolve('reveal.js'), '..', '..');
    app.use('/reveal', express.static(reveal));

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Example app listening at port %s', port);
    });

    return server;
};
