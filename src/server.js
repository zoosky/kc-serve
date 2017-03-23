var express = require('express');
var app = express();
var fs = require('fs');

module.exports = function(template) {
    app.get('/', function (req, res) {
        res.status(200).send(template);
    });

    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Example app listening at port %s', port);
    });

    return server;
};
