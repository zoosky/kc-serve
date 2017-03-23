var fs = require('fs');
var path = require('path');
var mustache = require('mustache');

module.exports = (data) => {
    data.highlightTheme = data.highlightTheme || 'vs'

    var f = path.join(__filename, '..', '..', 'src/template/reveal.html');
    return mustache.to_html(fs.readFileSync(f).toString(), data);
}