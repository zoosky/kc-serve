var fs = require('fs');
var path = require('path');
var includes = require('array-includes');

module.exports.slides = (cwd) => readTree(path.join(cwd, 'slides'), '');
module.exports.css = (root) => fs.readdirSync(path.join(root, 'css'));

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