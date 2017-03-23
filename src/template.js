var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

module.exports = (data) => {
    data.highlightTheme = data.highlightTheme || 'vs'

    var dir = path.join(__filename, '..', '..', 'src', 'template')
    var html = path.join(dir, 'reveal.html');
    var slide = path.join(dir, 'slide.html');

    handlebars.registerPartial("slide", fs.readFileSync(slide).toString());
    var template = handlebars.compile(fs.readFileSync(html).toString());

    return () => template(data);
}