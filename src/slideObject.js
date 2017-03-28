var path = require('path')
var includes = require('array-includes');

module.exports = (file) => {
    return { 
        path: file,
        isMarkdown: path.extname(file) === '.md',
        isImage: isImage(file)
    };
}

function isImage(file) {
    return includes(['.png', '.gif', '.jpg', '.jpeg', '.svg'], path.extname(file));
}

module.exports.isImage = isImage;
