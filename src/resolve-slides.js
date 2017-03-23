var fs = require('fs');
var path = require('path');
var includes = require('array-includes');

module.exports = (root) => {
    return readTree(root, '');
}

function readTree(root, dir) {
   return fs
    .readdirSync(path.join(root, dir))
    .map(m => path.join(dir, m))
    .map(m => fs.lstatSync(path.join(root, m)).isDirectory() ? readTree(root, m) : filter(m))
    .filter(m => m)
}

function filter(file) {
    if ((b = isImage(file)) || includes(['.md'], path.extname(file))) {
        return { path: file, isImage: b };
    }
}

function isImage(file) {
    return includes(['.png', '.gif', '.jpg', '.jpeg', '.svg'], path.extname(file));
}
module.exports.isImage = isImage;